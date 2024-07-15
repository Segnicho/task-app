/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { List, Card, Button, Input, Modal, Checkbox, Collapse } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

import 'tailwindcss/tailwind.css';
import axiosClient from '../utils/axios';

const { Panel } = Collapse;

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosClient.get(`/collections/${id}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [id]);

  const handleAddTask = async () => {
    try {
      const response = await axiosClient.post(`/collections/${id}/tasks`, {
        title: newTask,
        completed: false,
        date: new Date().toISOString().split('T')[0],
        subtasks: [],
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async () => {
    try {
      const response = await axiosClient.put(`/collections/${id}/tasks/${editingTask.id}`, {
        title: editingTask.title,
        completed: editingTask.completed,
      });
      setTasks(tasks.map((task) => (task.id === editingTask.id ? response.data : task)));
      setIsEditModalVisible(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axiosClient.delete(`/collections/${id}/tasks/${editingTask.id}`);
      setTasks(tasks.filter((task) => task.id !== editingTask.id));
      setIsDeleteModalVisible(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCheckboxChange = async (taskId, subtaskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (subtaskId) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
            ),
          };
        } else {
          return { ...task, completed: !task.completed };
        }
      }
      return task;
    });

    setTasks(updatedTasks);

    const taskToUpdate = updatedTasks.find((task) => task.id === taskId);
    
    try {
      await axiosClient.put(`/collections/${id}/tasks/${taskId}`, taskToUpdate);
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  const handleDoubleClick = (task) => {
    setEditingTask(task);
    setIsEditModalVisible(true);
  };

  const handleLongPress = (task) => {
    setEditingTask(task);
    setIsDeleteModalVisible(true);
  };

  const renderTask = (task) => (
    <Collapse
      expandIconPosition="end"
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} style={{ color: 'white' }} />
      )}
      className="mb-2"
      style={{ background: '#2D2E33', borderColor: '#3A3B40' }}
    >
      <Panel
        header={
          <Checkbox
            checked={task.completed}
            onChange={() => handleCheckboxChange(task.id)}
            style={{ color: 'white' }}
          >
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: 'white',
              }}
            >
              {task.title}
            </span>
          </Checkbox>
        }
        key={task.id}
        onDoubleClick={() => handleDoubleClick(task)}
        onContextMenu={(e) => {
          e.preventDefault();
          handleLongPress(task);
        }}
      >
        <List
          dataSource={task.subtasks}
          renderItem={(subtask) => (
            <List.Item style={{ background: '#17181F', border: 'none' }}>
              <Checkbox
                checked={subtask.completed}
                onChange={() => handleCheckboxChange(task.id, subtask.id)}
                style={{ color: 'white' }}
              >
                {subtask.title}
              </Checkbox>
            </List.Item>
          )}
        />
      </Panel>
    </Collapse>
  );

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="p-4 min-h-screen bg-[#17181F] text-white">
      <Card
        title={<span style={{ color: 'white' }}>{`Tasks (${activeTasks.length})`}</span>}
        className="mx-auto max-w-lg text-white"
        style={{ background: '#17181F', border: 'none', color: 'white' }}
      >
        <div className="flex mb-2">
          <Button
            type="primary"
            onClick={handleAddTask}
            className="mr-2"
            style={{ backgroundColor: '#F3829D', borderColor: '#F3829D' }}
          >
            Add
          </Button>
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="text-white"
            style={{ backgroundColor: '#2D2E33', borderColor: '#3A3B40', color: 'white' }}
            placeholderStyle={{ color: 'white' }}
          />
        </div>
        <List itemLayout="horizontal" dataSource={activeTasks} renderItem={renderTask} />
      </Card>

      <Card
        title={<span style={{ color: 'white' }}>{`Completed (${completedTasks.length})`}</span>}
        className="mx-auto max-w-lg mt-4"
        style={{ background: '#17181F', border: 'none', color: 'white' }}
      >
        <List itemLayout="horizontal" dataSource={completedTasks} renderItem={renderTask} />
      </Card>

      <Modal
        title={<span style={{ color: 'white' }}>Edit Task</span>}
        open={isEditModalVisible}
        onOk={handleEditTask}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
        style={{ backgroundColor: '#17181F', color: 'white' }}
        bodyStyle={{ backgroundColor: '#17181F', color: 'white' }}
      >
        <Input
          value={editingTask?.title || ''}
          onChange={(e) =>
            setEditingTask({ ...editingTask, title: e.target.value })
          }
          placeholder="Task Title"
          style={{ color: 'white', backgroundColor: '#2D2E33', borderColor: '#3A3B40' }}
        />
        <Checkbox
          checked={editingTask?.completed || false}
          onChange={(e) =>
            setEditingTask({ ...editingTask, completed: e.target.checked })
          }
          style={{ color: 'white' }}
        >
          Completed
        </Checkbox>
      </Modal>

      <Modal
        title={<span style={{ color: 'white' }}>Delete Task</span>}
        visible={isDeleteModalVisible}
        onOk={handleDeleteTask}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </div>
  );
};

export default Tasks;
