import {MapPin} from "lucide-react";
export default function FilterCard({
    image,
    title,
    address,
    price,
    size,
    mapLink

}) {
    return (
        <>
         <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-center ">
                <img
                    src={image}
                    className="w-full sm:w-48 h-48 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
                    alt="Room Image"
                />
                <div className='w-full'>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <div className="flex items-center"> <p className="mr-2 text-primary mb-2">Giá từ</p> <p className="text-lg text-red-500  text-primary mb-2">{price}</p></div>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <span>{address}</span>
                        <span>•</span>
                        <span>{size}</span>
                    </div>
                   <div className="flex items-center justify-start w-50 mt-2">
                    <MapPin href={mapLink} className="w-4 h-4 mr-1 cursor-pointer"></MapPin><p className="cursor-pointer hover:underline"> Xem trên bản đồ</p>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}