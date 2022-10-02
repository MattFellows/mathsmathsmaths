
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const History = ({data}) => {
    const formattedData = data.map((d, i) => ({name: `Attempt ${i}`, score: d}));

    const renderLineChart = (
    <LineChart width={600} height={160} data={formattedData}>
        <Line type="monotone" dataKey="score" stroke="#8884d8" />   
        <XAxis />
        <YAxis />
    </LineChart>
    );
    return renderLineChart;
}

export default History