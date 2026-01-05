function Sidebar() {
  return (
    <aside className="w-56 bg-black text-white border-r border-gray-800 p-4">
      <ul className="space-y-3">
        <li className="hover:text-gray-400 cursor-pointer">Home</li>
        <li className="hover:text-gray-400 cursor-pointer">Subscriptions</li>
        <li className="hover:text-gray-400 cursor-pointer">Library</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
