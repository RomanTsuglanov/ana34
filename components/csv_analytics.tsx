import React, { useState } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Percent } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

// Тестовые данные
const monthlyData = [
  { month: 'Янв', sales: 4000, profit: 2400, turnover: 7, discount: 5 },
  { month: 'Фев', sales: 3000, profit: 1398, turnover: 6.8, discount: 4 },
  { month: 'Март', sales: 2000, profit: 9800, turnover: 7.2, discount: 3 },
  { month: 'Апр', sales: 2780, profit: 3908, turnover: 6.5, discount: 6 },
  { month: 'Май', sales: 1890, profit: 4800, turnover: 7.5, discount: 4 },
  { month: 'Июнь', sales: 2390, profit: 3800, turnover: 7.1, discount: 5 },
  { month: 'Июль', sales: 3490, profit: 4300, turnover: 6.9, discount: 7 },
];

const productData = [
  { name: 'A', value: 400, fullName: 'Модель A' },
  { name: 'Б', value: 300, fullName: 'Модель Б' },
  { name: 'В', value: 300, fullName: 'Модель В' },
  { name: 'Г', value: 200, fullName: 'Модель Г' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomCard = ({ title, value, icon: Icon, trend, trendValue, className = "" }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      {Icon && <Icon className="w-8 h-8 text-blue-500" />}
    </div>
    {trend && (
      <div className={`text-xs mt-2 ${trendValue >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trendValue >= 0 ? '↑' : '↓'} {Math.abs(trendValue)}% к прошлому периоду
      </div>
    )}
  </div>
);

const SalesAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Расчет итоговых метрик
  const totalSales = monthlyData.reduce((sum, item) => sum + item.sales, 0);
  const avgProfit = monthlyData.reduce((sum, item) => sum + item.profit, 0) / monthlyData.length;
  const avgTurnover = monthlyData.reduce((sum, item) => sum + item.turnover, 0) / monthlyData.length;
  const avgDiscount = monthlyData.reduce((sum, item) => sum + item.discount, 0) / monthlyData.length;

  const tabNames = {
    overview: 'Обзор',
    sales: 'Продажи',
    products: 'Товары'
  };

  return (
    <div className="w-full p-4 space-y-4 bg-gray-50 min-h-screen">
      {/* Информационные карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CustomCard
          title="Общие продажи"
          value={`${totalSales.toLocaleString()}`}
          icon={DollarSign}
          trend
          trendValue={12}
        />
        <CustomCard
          title="Средняя прибыль"
          value={`${avgProfit.toLocaleString()}`}
          icon={TrendingUp}
          trend
          trendValue={8}
        />
        <CustomCard
          title="Оборачиваемость"
          value={`${avgTurnover.toFixed(1)}x`}
          icon={ShoppingCart}
          trend
          trendValue={5}
        />
        <CustomCard
          title="Средняя скидка"
          value={`${avgDiscount.toFixed(1)}%`}
          icon={Percent}
          trend
          trendValue={-2}
        />
      </div>

      {/* Вкладки */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4" aria-label="Вкладки">
            {Object.entries(tabNames).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md
                  ${activeTab === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Содержимое вкладок */}
        <div className="mt-4">
          {activeTab === 'overview' && (
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Тренды продаж и прибыли</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                    <Legend />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#8884d8" 
                      name="Продажи" 
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#82ca9d" 
                      name="Прибыль" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Распределение продаж</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="sales" fill="#8884d8" name="Продажи" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Оборот и скидки</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="turnover" 
                        stackId="1" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        name="Оборот"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="discount" 
                        stackId="1" 
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        name="Скидки"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Распределение продаж</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {productData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => 
                          [`${value.toLocaleString()}`, productData.find(item => item.name === props.payload.name)?.fullName]
                        } 
                      />
                      <Legend 
                        formatter={(value) => productData.find(item => item.name === value)?.fullName} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Эффективность</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category"
                        tickFormatter={(value) => value}
                      />
                      <Tooltip 
                        formatter={(value, name, props) => 
                          [`${value.toLocaleString()}`, productData.find(item => item.name === props.payload.name)?.fullName]
                        }
                      />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Объём продаж" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsDashboard;