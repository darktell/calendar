import FilterForm from "./FilterForm";
import {useMedia} from "../hooks/useMedia";
import {useState} from "react";

const FilterContainer = (props: any) => {
    const isDesktop = useMedia("(min-width: 1024px)");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="fixed left-1/2 -translate-x-1/2 w-fit bottom-4 right-4 z-40 rounded-full bg-primary text-white px-6 py-2 shadow-md md:hidden"
                onClick={() => setIsOpen(true)}
            >
                Filter
            </button>

            {isOpen && !isDesktop && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed md:relative bottom-0 left-0 right-0 z-40 bg-white rounded-t-2xl p-4 md:p-0 pb-6 md:pb-0 transition-transform duration-300 ease-in-out ${
                    (isOpen || isDesktop) ? "translate-y-0" : "translate-y-full"
                }`}
            >
                {isDesktop && <p className="text-xl font-medium my-4 text-center">Filter by date and time</p>}
                <FilterForm/>
            </div>
        </>
    )
}

export default FilterContainer