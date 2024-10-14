import { DatePicker, Switch, TimePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

//
const formatTime = "HH:mm";
const formatDate = "DD-MM-YYYY";

//
interface IPropTimerDateHours {
    getDate: (date: string) => void;
    getTime: (hours: string) => void;
}

export const TimerDateHours = ({ getDate, getTime }: IPropTimerDateHours) => {
    const toDay = dayjs();
    const defaultDate = dayjs(toDay.format(formatDate), formatDate);
    const defaultTime = dayjs(toDay.format(formatTime), formatTime);
    const [disable, setDisable] = useState<boolean>(true);

    useEffect(() => {
        getDate(defaultDate.format(formatDate));
        getTime(defaultTime.format(formatTime));
        return () => {
            getDate(defaultDate.format(formatDate));
            getTime(defaultTime.format(formatTime));
        };
    }, [])
    
    // 
    const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
        if (dateString) {
            getDate(disable ? "" : dateString as string);
        }
    };

    // 
    const onChangeHours = (
        time: dayjs.Dayjs,
        timeString: string | Array<string>
    ) => {
        if (timeString) {
            getTime(disable ? "" : timeString as string);
        }
    };

    // 
    const onChangeSwitch = (checked: boolean) => {
        setDisable(!checked);
    };

    return (
        <div className="flex items-center gap-8">
            <div>
                <Switch defaultChecked={false} onChange={onChangeSwitch} />
            </div>
            <div className="flex gap-8">
                <DatePicker
                    onChange={onChangeDate}
                    defaultValue={defaultDate}
                    format={formatDate}
                    disabled={disable}
                />
                <TimePicker
                    onChange={onChangeHours}
                    defaultValue={defaultTime}
                    format={formatTime}
                    disabled={disable}
                />
            </div>
        </div>
    );
};