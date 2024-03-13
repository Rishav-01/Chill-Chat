import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useConversation from "../zustand/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    // console.log(conversations);
    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error(`No user found with the name "${search}"`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search.."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoMdSearch size={20} className="outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
