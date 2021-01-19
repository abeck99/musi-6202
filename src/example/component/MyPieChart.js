import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';


const data = [
	{ name: 'Lecture Tests (20%)', value: 20 },
	{ name: 'Assignments (35%)', value: 35 },
	{ name: 'Midterm Exam I (10%)', value: 10 },
	{ name: 'Midterm Exam II (10%)', value: 10 },
	{ name: 'Final Project (20%)', value: 20 },
	{ name: 'Participation (5%)', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${data[index].name}`}
		</text>
	);
};

export default class MyPieChart extends Component {
	render() {
		return (
      <div>
    	  <PieChart width={1200} height={550}>
				<Pie
					data={data}
					cx={500}
					cy={250}
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={250}
					fill="#8884d8"
					dataKey="value"
          isAnimationActive={false}
				>
					{
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
				</Pie>
			</PieChart>
        </div>
		);
	}
}
