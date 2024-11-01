import { useState } from "react";

interface GroupDialogProps {
  show: boolean;
  onClose: () => void;
  onCreate: (groupName: string) => void;
}

const GroupDialog = ({ show, onClose, onCreate }: GroupDialogProps) => {
  const [groupName, setGroupName] = useState("");

  if (!show) return null;

  const handleCreate = () => {
    onCreate(groupName);
    setGroupName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group name"
          className="border p-2 w-full rounded-md"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDialog;
