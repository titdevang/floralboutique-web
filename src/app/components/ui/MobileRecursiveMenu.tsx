import React, {useState} from "react";
import Link from "next/link";

type MenuItem = {
    name: string;
    subCategory?: MenuItem[];
    slug: string;
};

interface RecursiveMenuProps {
    sections: MenuItem[];
    level?: number;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileRecursiveMenu: React.FC<RecursiveMenuProps> = ({
                                                               sections,
                                                               level = 0,
                                                               setIsMenuOpen
                                                           }) => {
    const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

    const toggleIndex = (index: number) => {
        setOpenIndexes((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <ul
            className={`space-y-1 ${
                level > 0 ? "pl-4 border-l border-gray border-opacity-30" : ""
            }`}
        >
            {sections.map((item, index) => {
                const isOpen = openIndexes[index] || false;

                return (
                    <li key={index}>
                        <div
                            className="flex items-center justify-between cursor-pointer py-1 px-2 rounded"
                        >
                            <Link onClick={() => {
                                setOpenIndexes((prev) => ({
                                    ...prev,
                                    [index]: false,
                                }));
                                setIsMenuOpen(false)
                            }}
                                  href={"/category/" + item.slug}>{item.name}</Link>
                            {item.subCategory && item.subCategory.length > 0 && (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleIndex(index);
                                    }}
                                    className="text-sm text-primary">
                  {isOpen ? "-" : "+"}
                </span>
                            )}
                        </div>

                        <div
                            className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${
                                isOpen ? "max-h-[500px]" : "max-h-0"
                            }`}
                        >
                            <MobileRecursiveMenu
                                sections={item.subCategory || []}
                                level={level + 1}
                                setIsMenuOpen={setIsMenuOpen}
                            />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default MobileRecursiveMenu;
