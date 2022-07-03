import './styles.scss';

import { Col } from 'react-bootstrap';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import filterIcon from '../../assets/images/filter-icon.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectFilters, updateActiveFilters } from './filtersSlice';
import { IActiveFilters, days } from '../../types/filter';

export default function Filter() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const [showFilter, setShowFilter] = useState(false);
  const defaultValues = {
    weekday: [],
    categories: [],
    minValue: '',
    maxValue: '',
  };

  const weekdays: days[] = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IActiveFilters>({
    defaultValues,
  });

  const onSubmit = (data: IActiveFilters) => {
    dispatch(updateActiveFilters(data));
  };
  const handleCleanFilters = () => {
    reset();
    dispatch(updateActiveFilters(defaultValues));
  };

  return (
    <div className="filter-container">
      <div>
        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <img src={filterIcon} alt="filter icon" className="img-fluid" />
          Filtrar
        </button>
      </div>
      {showFilter && (
        <div className="filter-buttons-container">
          <Form onSubmit={handleSubmit(onSubmit)} className="filter-form">
            <Col>
              <Form.Label className="filter-title">Dias da Semana</Form.Label>
              <Form.Group className="checkbox-group">
                {weekdays.map((day) => {
                  return (
                    <div key={day} className="filters-btn">
                      <input
                        className="checkbox-hide-button"
                        type={'checkbox'}
                        value={day}
                        id={day}
                        {...register('weekday')}
                      />
                      <label htmlFor={day}>
                        {day}
                        <span>+</span>
                      </label>
                    </div>
                  );
                })}
              </Form.Group>
            </Col>
            <div className="vertical-line" />
            <Col>
              <Form.Label className="filter-title">Categorias</Form.Label>
              <Form.Group className="checkbox-group">
                {filters.categories.map((category) => {
                  return (
                    <div key={category}>
                      <input
                        type={'checkbox'}
                        value={category}
                        id={category}
                        {...register('categories')}
                      />
                      <label htmlFor={category}>
                        {category}
                        <span>+</span>
                      </label>
                    </div>
                  );
                })}
              </Form.Group>
            </Col>
            <div className="vertical-line" />

            <Col className="minMax-filter-container" md={2} lg={2} xl={1}>
              <Form.Label className="filter-title">Valor</Form.Label>
              <Form.Group className="minMax-group">
                <Form.Label htmlFor="minValue">Min</Form.Label>
                <input
                  id="minValue"
                  type="number"
                  step="0.01"
                  {...register('minValue', {
                    min: { value: 1, message: 'O valor deve ser maior que 0' },
                  })}
                  className={`form-control ${
                    errors.minValue ? 'is-invalid' : ''
                  }`}
                />
                <Form.Text>{errors.minValue?.message}</Form.Text>
                <Form.Label htmlFor="maxValue">Max</Form.Label>
                <input
                  id="maxValue"
                  type="number"
                  step="0.01"
                  className={`form-control ${
                    errors.maxValue ? 'is-invalid' : ''
                  }`}
                  {...register('maxValue', {
                    min: { value: 1, message: 'O valor deve ser maior que 0' },
                  })}
                />
                <Form.Text>{errors.maxValue?.message}</Form.Text>
              </Form.Group>
            </Col>

            <Col md={3} lg={2}>
              <Form.Group className="action-buttons-container">
                <button
                  type="button"
                  onClick={handleCleanFilters}
                  className="remove-filters-btn"
                >
                  Limpar
                </button>
                <button type="submit" className="apply-filters-btn">
                  Aplicar
                </button>
              </Form.Group>
            </Col>
          </Form>
        </div>
      )}
    </div>
  );
}
