"use client"

import { useState } from "react"
import { Search, Phone, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function ContactContent() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Alice Brown", email: "alice@example.com", phone: "123-456-7890", date: "2023-05-15", status: "Pending" },
    { id: 2, name: "Charlie Davis", email: "charlie@example.com", phone: "098-765-4321", date: "2023-05-16", status: "Contacted" },
    { id: 3, name: "Eva Green", email: "eva@example.com", phone: "111-222-3333", date: "2023-05-17", status: "Booked" },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-500"
      case "Contacted": return "bg-blue-500"
      case "Booked": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Management</h2>
      </div>
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.date}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact {contact.name}</DialogTitle>
                        <DialogDescription>
                          Contact details for {contact.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-5 w-5" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-5 w-5" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5" />
                          <span>{contact.date}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}