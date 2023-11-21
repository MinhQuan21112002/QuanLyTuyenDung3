import { Box } from "@chakra-ui/react";
import React from "react";
import { Header } from "../../Components-admin";
import {
    ScheduleComponent,
    ViewsDirective,
    ViewDirective,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
    Resize,
    DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { scheduleData } from "../../data/dummy";
import { useState } from "react";
import { useEffect } from "react";
import { calendarService } from "../../Service/calendar.service";
import { calendarConver } from "./CalendarConvert";
import './calendar.css'

// {
//     Id: 1,
//     Subject: 'Explosion of Betelgeuse Star',
//     Location: 'Space Center USA',
//     StartTime: '2021-01-10T04:00:00.000Z',
//     EndTime: '2021-01-10T05:30:00.000Z',
//     CategoryColor: '#1aaa55',
//   },

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

export const AdminCalendar = () => {
    const [scheduleObj, setScheduleObj] = useState();
    const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
    const [mycalendar, setMycalendar] = useState([]);
    const [displayCalendar, setDisplayCalendar] = useState([]);

    const change = (args) => {
        scheduleObj.selectedDate = args.value;
        scheduleObj.dataBind();
    };
    const onDragStart = (arg) => {
        arg.navigation.enable = true;
    };

    useEffect(() => {
        calendarService.getMyCalendar(accessToken)
        .then(res => {
            setDisplayCalendar(calendarConver.convertCalendar(res))
        })
        .catch(er => console.log(er));
    }, [])


    return (
        <>
            <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
                <Header category="pages" title="Calendar" />
                <ScheduleComponent
                    height="650px"
                    ref={(schedule) => setScheduleObj(schedule)}
                    selectedDate={new Date(2023, 12, 1)}
                    eventSettings={{ dataSource: displayCalendar }}
                    dragStart={onDragStart}
                >
                    <ViewsDirective>
                        {[ "Month", "Agenda"].map(
                            (item) => (
                                <ViewDirective key={item} option={item} />
                            )
                        )}
                    </ViewsDirective>
                    <Inject
                        services={[
                            Month,
                            Agenda,
                            Resize,
                            DragAndDrop,
                        ]}
                    />
                </ScheduleComponent>
                <PropertyPane>
                    <table style={{ width: "100%", background: "white" }}>
                        <tbody>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "100%" }}>
                                    <DatePickerComponent
                                        value={new Date(2021, 0, 10)}
                                        showClearButton={false}
                                        placeholder="Current Date"
                                        floatLabelType="Always"
                                        change={change}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </>
    );
};
