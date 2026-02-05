const UserRow = ({ user, onSend }) => {
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
          {user.username[0].toUpperCase()}
        </div>

        <span className="font-medium">{user.username}</span>
      </div>

      <button
        onClick={() => onSend(user)}
        className="bg-white text-black px-4 py-2 rounded-lg hover:bg-neutral-200 transition"
      >
        Send Money
      </button>
    </div>
  );
};

export default UserRow;
