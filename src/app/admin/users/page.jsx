// UsersContent.js
"use client";

import { useEffect, useState } from "react";
import { Search, UserPlus, Pencil, Trash2, BookCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { fetchUsers, copyUser, deleteUser, editUser } from "@/AdminAPI/GET/api";

export default function UsersContent() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [born, setBorn] = useState("");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    const filtered = users.filter((user) => {
      const lowerCaseSearchValue = searchValue.toLowerCase().trim();
      const combinedString = `${user.name.toLowerCase()} ${user.phone} ${user.id} ${user.email.toLowerCase()}`;
      return combinedString.includes(lowerCaseSearchValue);
    });
    setFilteredUsers(filtered);
  };

  const fetchData = async () => {
    try {
      const usersList = await fetchUsers();
      setUsers(usersList);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchData();
  }, [router]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleCopyUser = async (id) => {
    try {
      const newUser = await copyUser(id);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      const shouldGoToRecovery = window.confirm("Xóa người dùng thành công! Bạn có muốn đến trang khôi phục không?");
      if (shouldGoToRecovery) {
        router.push("/admin/KhoiPhucUsers");
      } else {
        fetchData();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    const updatedUser = { name, phone, address, born };

    try {
      const updatedData = await editUser(selectedUser.id, updatedUser);
      setUsers(users.map(user => (user.id === selectedUser.id ? updatedData : user)));
      setSelectedUser(null);
      setName("");
      setPhone("");
      setAddress("");
      setBorn("");
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => {
                        setSelectedUser(user);
                        setName(user.name);
                        setPhone(user.phone);
                        setAddress(user.address);
                        setBorn(user.born);
                      }}>
                        <Pencil className="mr-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                         Edit a user account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">Phone</Label>
                          <Input
                            id="phone"
                            type="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="address" className="text-right">Address</Label>
                          <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="born" className="text-right">Born</Label>
                          <Input
                            id="born"
                            value={born}
                            onChange={(e) => setBorn(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" onClick={handleEditUser}>Save changes</Button>
                        <Button type="button" variant="outline" onClick={() => setSelectedUser(null)}>Cancel</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" onClick={() => handleCopyUser(user.id)}>
                    <BookCopy className="mr-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
