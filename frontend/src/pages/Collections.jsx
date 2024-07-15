import { useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import CardItem from "../components/CardItem";
import { Button, Input, Modal } from "antd";
import "tailwindcss/tailwind.css";
import {
  BookOutlined,
  ShoppingCartOutlined,
  DingtalkOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AddTaskModal from "../components/AddTaskModal";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [activeTab, setActiveTab] = useState("collections");
  const [favorites, setFavorites] = useState([]);
  const [collectionItems, setCollectionItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddCollectionModalVisible, setIsAddCollectionModalVisible] =
    useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showAddCollectionModal = () => {
    setIsAddCollectionModalVisible(true);
  };

  const closeAddCollectionModal = () => {
    setIsAddCollectionModalVisible(false);
  };

  const handleAddCollection = async () => {
    try {
      await axiosClient.post("/collections", { name: newCollectionName });
      setNewCollectionName("");
      closeAddCollectionModal();
      fetchCollections();
    } catch (error) {
      console.error("Error adding collection:", error);
    }
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axiosClient.get("/collections");
        setCollections(response.data.collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const collections = [
          { id: 4, name: "Favorite 1" },
          { id: 5, name: "Favorite 2" },
        ];
        setFavorites(collections);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const getCollectionData = async (collectionId) => {
      try {
        const response = await axiosClient.get(
          `/collections/${collectionId}/tasks`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching collection tasks:", error);
        return [];
      }
    };

    const renderCollections = async () => {
      const collectionItems = await Promise.all(
        collections.map(async (collection) => {
          const tasks = await getCollectionData(collection.id);
          const completedTasks = tasks.filter((task) => task.completed).length;
          return {
            ...collection,
            completedTasks,
            totalTasks: tasks.length,
          };
        })
      );

      setCollectionItems(collectionItems);
    };

    renderCollections();
  }, [collections]);

  const iconMap = {
    "collection 1": (
      <BookOutlined className="text-white text-2xl mr-2 w-12 h-12 mb-4" />
    ),
    "collection 2": (
      <ShoppingCartOutlined className="text-white text-2xl mr-2 w-12 h-12 mb-4" />
    ),
    "collection 3": (
      <DingtalkOutlined className="text-white text-2xl mr-2 w-12 h-12 mb-4" />
    ),
    "Favorite 1": (
      <BookOutlined className="text-white text-2xl mr-2 w-12 h-12 mb-4" />
    ),
    "Favorite 2": (
      <ShoppingCartOutlined className="text-white text-2xl mr-2 w-12 h-12 mb-4" />
    ),
  };

  const handleCollectionClick = (collectionId) => {
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div className="p-4 min-h-screen bg-black text-white">
      <div className="flex justify-between gap-4 p-20 text-white mb-4">
        <div className="flex justify-between gap-4">
          <Button
            type={activeTab === "favorites" ? "primary" : "default"}
            onClick={() => setActiveTab("favorites")}
            style={{
              backgroundColor:
                activeTab === "favorites" ? "#F3829D" : "#2D2E33",
              borderColor: "#F3829D",
              color: "white",
            }}
          >
            Favorites
          </Button>
          <Button
            type={activeTab === "collections" ? "primary" : "default"}
            onClick={() => setActiveTab("collections")}
            className="mr-2"
            style={{
              backgroundColor:
                activeTab === "collections" ? "#F3829D" : "#2D2E33",
              borderColor: "#F3829D",
              color: "white",
            }}
          >
            All Collections
          </Button>
        </div>
        <div>
          <PlusCircleOutlined onClick={showModal} className="bg-[#F3829D]" />
          <AddTaskModal visible={isModalVisible} onClose={closeModal} />
        </div>
      </div>
      <div className="flex gap-4 justify-center flex-wrap">
        {collectionItems.map((collection) => (
          <div
            key={collection.id}
            onClick={() => handleCollectionClick(collection.id)}
            className="cursor-pointer"
          >
            <CardItem
              key={collection.id}
              name={collection.name}
              completedTasks={collection.completedTasks}
              totalTasks={collection.totalTasks}
              icon={iconMap[collection.name]}
            />
          </div>
        ))}
        <div
          onClick={showAddCollectionModal}
          className="bg-[#2D2E33] p-4 rounded-lg shadow-lg text-white w-48 h-24 flex items-center justify-center cursor-pointer"
        >
          <div className="text-3xl font-bold">+</div>
        </div>
      </div>

      {/* Add Collection Modal */}

      <Modal
        open={isAddCollectionModalVisible}
        onCancel={closeAddCollectionModal}
        footer={null}
        className="rounded-lg bg-primary-bg text-white"
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Add New Collection</h2>
          <Input
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Collection Name"
            className="bg-[#2D2E33] text-white placeholder-gray-400 mb-4"
          />
          <Button
            onClick={handleAddCollection}
            className="bg-[#F3829D] text-white w-full"
          >
            Add Collection
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Collections;
