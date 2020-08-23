import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Area,
  Label,
  XAxis,
  Legend,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import Input from '../../components/Input';

import { Container, InputsWrapper } from './styles';
import { formatNumber } from '../../utils/format';

interface IResults {
  total: string;
  totalInterest: string;
}

const Dashboard: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [period, setPeriod] = useState('');
  const [results, setResults] = useState<IResults[]>([]);

  useEffect(() => {
    if (initialAmount === '' || interest === '' || period === '') return;

    let accumulator = Number(initialAmount);

    const newResults = new Array(Number(period)).fill(null).map(_ => {
      accumulator *= 1 + Number(interest) / 100;
      return {
        total: accumulator.toFixed(2),
        totalInterest: (accumulator - Number(initialAmount)).toFixed(2),
      };
    });
    setResults(newResults);
  }, [initialAmount, interest, period]);

  const data = useMemo(() => {
    const resultsData = [] as any;

    results.forEach((month, index) => {
      resultsData.push({
        name: index + 1,
        Dinheiro_investido: initialAmount,
        Dinheiro_acumulado: month.total,
        Total_em_juros: month.totalInterest,
      });
    });

    return resultsData;
  }, [initialAmount, results]);

  return (
    <Container>
      <h1>React - Juros Compostos</h1>

      <form>
        <InputsWrapper>
          <Input
            required
            type="number"
            label="Montante inicial"
            name="initial-amount"
            value={String(initialAmount)}
            onChange={({ target }) => setInitialAmount(target.value)}
            min="0"
            max="100000"
          />
          <Input
            required
            type="number"
            label="Taxa de juros mensal"
            name="interest-rate"
            value={String(interest)}
            onChange={({ target }) => setInterest(target.value)}
            min="-12"
            max="12"
            step="0.1"
          />
          <Input
            required
            type="number"
            label="Período (meses)"
            name="period"
            value={String(period)}
            onChange={({ target }) => setPeriod(target.value)}
            min="1"
            max="36"
          />
        </InputsWrapper>
      </form>
      <ResponsiveContainer width="90%" height={450}>
        <LineChart
          data={data}
          syncId="anyId"
          margin={{ top: 80, right: 10, left: 10, bottom: 25 }}
        >
          <CartesianGrid stroke="#999" strokeDasharray="3 3" />

          <XAxis>
            <Label
              value="Meses"
              offset={0}
              position="insideBottomLeft"
              style={{ fill: '#000' }}
            />
          </XAxis>
          <YAxis>
            <Label
              value="R$"
              offset={0}
              position="insideBottomLeft"
              style={{ fill: '#000' }}
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="Dinheiro_investido"
            stroke="#CC4728"
            fill="#fff"
          />
          <Line
            type="monotone"
            dataKey="Dinheiro_acumulado"
            stroke="#1E60BB"
            fill="#fff"
          />
          <Line
            type="monotone"
            dataKey="Total_em_juros"
            stroke="#DA9544"
            fill="#fff"
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Dashboard;
