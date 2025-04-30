import {useState, FC, ReactNode} from "react";
import {useField} from "formik";
import cn from "classnames";

const DAYS: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
    startDateName: string;
    endDateName: string;
}

const DateRangePicker: FC<Props> = ({startDateName, endDateName}) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [{value: selectedStartDate},{error: startError} , {setValue: setSelectedStartDate, setError: setErrorStartDate}] =
        useField(startDateName);
    const [{value: selectedEndDate},{error: endError} , {setValue: setSelectedEndDate, setError: setErrorEndDate}] =
        useField(endDateName);

    console.log(startError, endError)
    const handleDayClick = (selectedDay: Date): void => {
        const dayString = selectedDay.toLocaleDateString("en-US");
        setErrorStartDate("")
        setErrorEndDate("")
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            setSelectedStartDate(dayString);
            setSelectedEndDate(null);
        } else {
            if (new Date(selectedDay) < new Date(selectedStartDate)) {
                setSelectedEndDate(selectedStartDate);
                setSelectedStartDate(dayString);
            } else {
                setSelectedEndDate(dayString);
            }
        }
    };

    const renderCalendar = (): ReactNode[] => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray: ReactNode[] = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(<div key={`empty-${i}`}></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(year, month, i);
            const dayString = day.toLocaleDateString("en-US");

            let className =
                "flex items-center justify-center cursor-pointer w-[46px] h-[46px] rounded-full text-dark hover:bg-primary hover:text-white";

            if (selectedStartDate && dayString === selectedStartDate) {
                className += " bg-primary text-white rounded-r-none";
            }
            if (selectedEndDate && dayString === selectedEndDate) {
                className += " bg-primary text-white rounded-l-none";
            }
            if (
                selectedStartDate &&
                selectedEndDate &&
                new Date(day) > new Date(selectedStartDate) &&
                new Date(day) < new Date(selectedEndDate)
            ) {
                className += " bg-primary/30 rounded-none";
            }

            daysArray.push(
                <div
                    key={i}
                    className={className}
                    data-date={dayString}
                    onClick={() => handleDayClick(day)}
                >
                    {i}
                </div>
            );
        }

        return daysArray;
    };

    return (
        <section
            id="datepicker-container"
            className="shadow-datepicker my-2 rounded-xl border border-stroke bg-white pt-5 h-fit max-w-[600px] mx-auto"
        >
            <div className="flex items-center justify-between px-5">
                <button
                    id="prevMonth"
                    className="rounded-full px-2 py-2 text-dark hover:bg-gray-300"
                    onClick={() =>
                        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
                    }
                >
                    {/* SVG Left Arrow */}
                    <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20">
                        <path
                            d="M13.5312 17.9062C13.3437 17.9062 13.1562 17.8438 13.0312 17.6875L5.96875 10.5C5.6875 10.2187 5.6875 9.78125 5.96875 9.5L13.0312 2.3125C13.3125 2.03125 13.75 2.03125 14.0312 2.3125C14.3125 2.59375 14.3125 3.03125 14.0312 3.3125L7.46875 10L14.0625 16.6875C14.3438 16.9688 14.3438 17.4062 14.0625 17.6875C13.875 17.8125 13.7187 17.9062 13.5312 17.9062Z"
                            fill=""
                        />
                    </svg>
                </button>

                <div id="currentMonth" className="text-lg font-medium text-dark">
                    {currentDate.toLocaleString("en-US", {month: "long"})} {currentDate.getFullYear()}
                </div>

                <button
                    id="nextMonth"
                    className="rounded-full px-2 py-2 text-dark hover:bg-gray-300"
                    onClick={() =>
                        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
                    }
                >
                    {/* SVG Right Arrow */}
                    <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20">
                        <path
                            d="M6.46875 17.9063C6.28125 17.9063 6.125 17.8438 5.96875 17.7188C5.6875 17.4375 5.6875 17 5.96875 16.7188L12.5312 10L5.96875 3.3125C5.6875 3.03125 5.6875 2.59375 5.96875 2.3125C6.25 2.03125 6.6875 2.03125 6.96875 2.3125L14.0313 9.5C14.3125 9.78125 14.3125 10.2187 14.0313 10.5L6.96875 17.6875C6.84375 17.8125 6.65625 17.9063 6.46875 17.9063Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>

            <div className="mb-4 mt-6 grid grid-cols-7 gap-2 px-5">
                {DAYS.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-secondary-color">
                        {day}
                    </div>
                ))}
            </div>

            <div id="days-container" className="mt-2 grid grid-cols-7 gap-y-0.5 px-5">
                {renderCalendar()}
            </div>

            <div className="grid grid-cols-2 gap-4 px-2 py-4">
        <span
            className={cn("h-[37px] rounded border border-stroke bg-transparent text-sm px-5 font-medium text-body-color flex items-center justify-center",
                {"border-red-400": !!startError})}>
          {selectedStartDate || "Select Start Date"}
        </span>
                <span
                    className={cn("h-[37px] rounded border border-stroke bg-transparent text-sm px-5 font-medium text-body-color flex items-center justify-center",
                        {"border-red-400": !!endError})}>
          {selectedEndDate || "Select End Date"}
        </span>
            </div>
        </section>
    );
};

export default DateRangePicker;
