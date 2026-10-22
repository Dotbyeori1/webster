import { useState } from 'react';
import Calendar from 'react-calendar';
import { Card } from "react-bootstrap";

import UpcomingEvents from "./UpcomingEvents";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const WorkingSchedule = () => {
    const [selectedDate, setSelectedDate] = useState<Value>(new Date());

    return (
        <>
            <Card className="bg-white border-0 rounded-3 mb-4">
                <Card.Body className="p-4">
                    <div className="mb-3 mb-lg-4">
                        <h3 className="mb-0">Working Schedule</h3>
                    </div>
                    <Calendar onChange={setSelectedDate} value={selectedDate} />
                    <UpcomingEvents />
                </Card.Body>
            </Card>
        </>
    );
};

export default WorkingSchedule;

