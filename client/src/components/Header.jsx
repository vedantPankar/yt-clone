function Header() {
  return (
    <header className="h-14 flex items-center justify-between px-4 bg-black text-white border-b border-gray-800">
      <h1 className="text-xl font-semibold">YouTube Clone</h1>

      <input
        type="text"
        placeholder="Search"
        className="w-1/3 px-3 py-1 rounded bg-gray-900 border border-gray-700 focus:outline-none"
      />
    </header>
  );
}

export default Header;
