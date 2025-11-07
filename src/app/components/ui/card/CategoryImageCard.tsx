import Image from "next/image";

interface CategoryImageCardProps {
  src: string;
  alt: string;
  name: string;
}

const CategoryImageCard: React.FC<CategoryImageCardProps> = ({ src, alt }) => {
  return (
    <div>
      <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-[20px]">
        <Image
          src={src}
          width={1000}
          height={1000}
          alt={alt}
          className="w-full h-auto"
          
        />
      </div>
    </div>
  );
};

export default CategoryImageCard;