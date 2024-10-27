"use client"

import { useState } from "react"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function BannerContent() {
  const [banners, setBanners] = useState([
    { id: 1, title: "Summer Sale", image: "/placeholder.svg?height=100&width=300", active: true },
    { id: 2, title: "New Arrivals", image: "/placeholder.svg?height=100&width=300", active: false },
    { id: 3, title: "Special Offer", image: "/placeholder.svg?height=100&width=300", active: true },
  ])

  const [newBanner, setNewBanner] = useState({ title: "", image: "" })

  const handleAddBanner = () => {
    setBanners([...banners, { id: banners.length + 1, ...newBanner, active: true }])
    setNewBanner({ title: "", image: "" })
  }

  const handleToggleActive = (id) => {
    setBanners(banners.map(banner =>
      banner.id === id ? { ...banner, active: !banner.active } : banner
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="blue">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
              <DialogDescription>
                Create a new banner to display on the website.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  value={newBanner.image}
                  onChange={(e) => setNewBanner({ ...newBanner, image: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="blue" type="submit" onClick={handleAddBanner}>Add Banner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.map((banner) => (
            <TableRow key={banner.id}>
              <TableCell>{banner.title}</TableCell>
              <TableCell>
                <img src={banner.image} alt={banner.title} className="h-16 w-32 object-cover" />
              </TableCell>
              <TableCell>
                <Button
                  variant={banner.active ? "default" : "outline"}
                  onClick={() => handleToggleActive(banner.id)}
                >
                  {banner.active ? "Active" : "Inactive"}
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}