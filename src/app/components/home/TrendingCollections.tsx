import { useHomeItem } from '@/app/context/HomeItemContext';
import Link from 'next/link';
import ImageWithFallback from '../ui/fields/ImageWithFallback';

const TrendingCollections = () => {
  const { trendingCollections } = useHomeItem();
  
  if (!trendingCollections) return;

    return (
      <div>
        {trendingCollections?.map((collection, index) => {
          return (
            <div
              key={index}
              className=" relative h-[150px] md:h-[300px] w-full overflow-hidden rounded-[20px]"
            >
              <Link href={collection.link}>
                <ImageWithFallback
                  src={collection.image}
                  alt="floralboutique"
                  fill
                  className="rounded-[20px] object-cover hover:scale-105 duration-500"
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
}

export default TrendingCollections