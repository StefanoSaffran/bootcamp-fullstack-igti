import React, { useState, useEffect, useMemo } from 'react';

import { RadialChart } from 'react-vis';

import { calculateSalaryFrom, calcPercentage } from '../../utils/salary';
import { formatNumber } from '../../utils/format';
import Input from '../../components/Input';

import { Container, Results, Salary } from './styles';

interface ISalary {
  netSalary: number;
  formattedNetSalary: string;
  baseINSS: string;
  discountINSS: number;
  formattedDiscountINSS: string;
  baseIRPF: string;
  discountIRPF: number;
  formattedDiscountIRPF: string;
}

const Dashboard: React.FC = () => {
  const [fullSalary, setFullSalary] = useState(1000);
  const [salaryInfo, setSalaryInfo] = useState<ISalary>({} as ISalary);

  useEffect(() => {
    const salaryData = calculateSalaryFrom(fullSalary);

    setSalaryInfo({
      netSalary: salaryData.netSalary,
      formattedNetSalary: formatNumber(salaryData.netSalary),
      baseINSS: formatNumber(Number(salaryData.baseINSS)),
      discountINSS: salaryData.discountINSS,
      formattedDiscountINSS: formatNumber(salaryData.discountINSS),
      baseIRPF: formatNumber(Number(salaryData.baseIRPF)),
      discountIRPF: salaryData.discountIRPF,
      formattedDiscountIRPF: formatNumber(salaryData.discountIRPF),
    });
  }, [fullSalary]);

  const inssPercentage = useMemo(() => {
    return calcPercentage(fullSalary, salaryInfo.discountINSS);
  }, [fullSalary, salaryInfo]);

  const irpfPercentage = useMemo(() => {
    return calcPercentage(fullSalary, salaryInfo.discountIRPF);
  }, [fullSalary, salaryInfo]);

  const salaryPercentage = useMemo(() => {
    return calcPercentage(fullSalary, salaryInfo.netSalary);
  }, [fullSalary, salaryInfo]);

  return (
    <Container>
      <h1>React Salário</h1>

      <Input
        value={fullSalary}
        onChange={({ target }) => setFullSalary(Number(target.value))}
        required
        name="salary"
        type="number"
        label="Salário bruto"
        min={0}
        step={100}
      />

      <Results>
        <div>
          <span>Base INSS</span>
          <strong>{salaryInfo.baseINSS}</strong>
        </div>
        <div>
          <span>Desconto INSS</span>
          <strong>
            {salaryInfo.formattedDiscountINSS}
            {Number(salaryInfo.discountINSS) > 0 && `(${inssPercentage})%`}
          </strong>
        </div>
        <div>
          <span>Base IRPF</span>
          <strong>{salaryInfo.baseIRPF}</strong>
        </div>
        <div>
          <span>Desconto IRPF</span>
          <strong>
            {salaryInfo.formattedDiscountIRPF}{' '}
            {Number(salaryInfo.discountIRPF) > 0 && `(${irpfPercentage})%`}
          </strong>
        </div>
      </Results>

      <Salary>
        <span>Salário líquido</span>
        <strong>
          {salaryInfo.formattedNetSalary}
          {Number(salaryInfo.netSalary) > 0 && `(${salaryPercentage})%`}
        </strong>
      </Salary>

      {fullSalary > 0 ? (
        <RadialChart
          showLabels
          labelsRadiusMultiplier={1.1}
          labelsStyle={{
            stroke: 'rgb(255, 255, 255)',
            height: 40,
            fontSize: 12,
          }}
          data={[
            {
              angle: Number(salaryPercentage),
              radius: 10,
              label: 'Salário',
              subLabel: `${salaryPercentage}%`,
              className: 'salary',
              stroke: '#000',
            },
            {
              angle: Number(irpfPercentage),
              radius: 10,
              label: `${Number(irpfPercentage) > 0 ? `IRPF` : ''}`,
              subLabel: `${
                Number(irpfPercentage) > 0 ? `${irpfPercentage}%` : ''
              }`,
              className: 'irpf',
              stroke: '#000',
            },
            {
              angle: Number(inssPercentage),
              radius: 10,
              label: 'INSS',
              subLabel: `${inssPercentage}%`,
              className: 'inss',
              stroke: '#000',
            },
          ]}
          width={300}
          height={315}
        />
      ) : (
        <h1>Entre com o valor do salário...</h1>
      )}
    </Container>
  );
};

export default Dashboard;
