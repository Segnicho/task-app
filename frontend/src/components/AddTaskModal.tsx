import { useState } from 'react';
import { Modal, Button, Input, DatePicker, Select } from 'antd';
import { CalendarOutlined, FlagOutlined, InboxOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import React from 'react';

const AddTaskModal = ({ visible, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('Design');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [collections, setCollections] = useState(['Design', 'Work', 'Personal']);

  const handleAddTask = () => {
    // Handle task addition logic here
    onClose();
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleCollectionChange = (value) => {
    setSelectedCollection(value);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      bodyStyle={{ backgroundColor: '#000000', padding: '20px' }}
      footer={null}
      className=" bg-primary-bg text-primary-text"
    >
      <div className="space-y-4">
        {/* Task Name Input */}
        <Input 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          placeholder="Task Name" 
          className="w-full bg-[#2D2E33] text-white placeholder-gray-400" 
        />

        {/* Collection, Date, and Flag Buttons */}
        <div className="flex space-x-4">
          <Select 
            value={selectedCollection}
            onChange={handleCollectionChange}
            className="flex items-center bg-[#2D2E33] text-white w-full justify-center"
            dropdownStyle={{ backgroundColor: '#2D2E33', color: 'white' }}
            bordered={false}
          >
            {collections.map(collection => (
              <Select.Option key={collection} value={collection} className="text-white">
                {collection}
              </Select.Option>
            ))}
          </Select>
          <DatePicker 
            value={selectedDate !== 'Today' ? moment(selectedDate, 'YYYY-MM-DD') : null}
            onChange={handleDateChange}
            placeholder={selectedDate}
            className="flex items-center bg-[#2D2E33] text-white w-full justify-center"
            bordered={false}
          />
          <Button className="flex items-center bg-[#2D2E33] text-white w-full justify-center">
            <FlagOutlined className="mr-2" />
          </Button>
        </div>

        {/* Add Task and Cancel Buttons */}
        <div className="flex justify-start space-x-4">
          <Button onClick={onClose} className="bg-[#2D2E33] text-white">
            Cancel
          </Button>
          <Button onClick={handleAddTask} className="bg-[#F3829D] text-white">
            Add Task
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
