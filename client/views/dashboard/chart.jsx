import { useEffect, useState } from "react";
import { ListDaySummary, ListMonthSummary } from "../../api/surat";
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    CartesianGrid
} from 'recharts';
import { paramsSummary } from "../../constants/constants";
import { useHistory } from "react-router-dom";

export const ChartJs = () => {
    const [summary, setSummary] = useState([]);
    const navigate = useHistory();

    useEffect(() => {
        if (paramsSummary === 'Months') {
            ListMonthSummary().then(setSummary)
        } else if (paramsSummary === 'Days') {
            ListDaySummary().then(setSummary)
        } else {
            ListDaySummary().then(setSummary)
        }

    }, []);

    // MONTH SUMMARY
    const handleFiltter = (e) => {
        navigate.push(e.target.value)
        window.location.reload(false)

    }

    return (
        <>
            <div class="row flex-between-center mb-4 g-3">
                <div class="col-auto">
                    <p class="text-700 lh-sm mb-0">Total surat tahun ini</p>
                </div>
                <div class="col-8 col-sm-4">
                    <select class="form-select"
                        id="floatingSelectTeam"
                        name='link'
                        onChange={(e) => handleFiltter(e)}
                    >
                        <option id="textCapitalize" selected>Filtter By {paramsSummary}</option>
                        <option value="/?filtter=Months">Filtter By Months</option>
                        <option value="/?filtter=Days">Filtter By Days</option>
                    </select>
                </div>
            </div>

            <ResponsiveContainer width="100%" height='0%' aspect={3}>
                <LineChart data={summary}>
                    <CartesianGrid vertical horizontal={false} verticalFill={['#fff', '#fff']} fillOpacity={0.2} />
                    <XAxis dataKey="label" interval={'preserveStartEnd'} />
                    <Legend />
                    <Tooltip />
                    <Line strokeWidth={2} dataKey="completed" stroke="#3874FF" activeDot={{ r: 5 }} />
                    <Line strokeWidth={1} strokeDasharray="3 4 5 2" dataKey="closed" stroke="#0097EB" activeDot={{ r: 5 }} />
                    {/* <Line strokeWidth={1} strokeDasharray="3 4 5 2" dataKey="assigneded" stroke="#0097EB" activeDot={{ r: 5 }} /> */}
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}