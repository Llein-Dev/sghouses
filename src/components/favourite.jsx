import { useEffect } from "react";
import Cookies from "js-cookie"; // Install this library for cookie handling: npm install js-cookie
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

const FavoriteButton = ({ idRoom, active, setActive }) => {
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = Cookies.get("token"); // Retrieve token from cookies
        const response = await fetch(
          `http://localhost:8000/api/yeu-thich/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );
        const data = await response.json();
        setActive(data.isFavorite); // Set the state from the parent
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchStatus();
  }, [idRoom, setActive]); // Include setActive as a dependency

  const handleFavorite = async (idRoom) => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      const response = await fetch(`http://localhost:8000/api/yeu-thich/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify({ id_room: idRoom }),
      });

      if (response.ok) {
        setActive((prev) => !prev); // Toggle active state from parent
      } else {
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button
      onClick={() => handleFavorite(idRoom)}
      variant="outline"
      size="icon"
      className={`rounded-full ${active ? "bg-red-500 text-white" : ""}`}
    >
      <Heart className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
      <span className="sr-only">
        {active ? "Remove from favorites" : "Add to favorites"}
      </span>
    </Button>
  );
};

export default FavoriteButton;
