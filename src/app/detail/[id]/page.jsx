"use client"
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';

export default function DetailPage() {
  // Lấy id từ URL bằng useParams
  const { id } = useParams(); 

  return (
    <div>
      <Breadcrumb />
 
    </div>
  );
}
