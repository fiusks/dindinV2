import './styles.scss';

import { Row, Col } from 'react-bootstrap';
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
    <Row>
      <Col>
        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <img src={filterIcon} alt="filter icon" className="img-fluid" />
          Filtrar
        </button>
        {showFilter && (
          <Row className="filter-container">
            <Col md={3}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="groupweek">
                  <Form.Label>Dias da Semana</Form.Label>
                  {weekdays.map((day) => {
                    return (
                      <div key={day}>
                        <Form.Label htmlFor={day}>{day}</Form.Label>
                        <Form.Check
                          type={'checkbox'}
                          value={day}
                          id={day}
                          {...register('weekday')}
                        />
                      </div>
                    );
                  })}
                </Form.Group>
                <Form.Group className="groupCategory">
                  <Form.Label>Categorias</Form.Label>
                  {filters.categories.map((category) => {
                    return (
                      <div key={category}>
                        <Form.Label htmlFor={category}>{category}</Form.Label>
                        <Form.Check
                          type={'checkbox'}
                          value={category}
                          id={category}
                          {...register('categories')}
                        />
                      </div>
                    );
                  })}
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="minValue">Min val</Form.Label>
                  <input id="minValue" type="text" {...register('minValue')} />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="maxValue">Max val</Form.Label>
                  <input id="maxValue" type="text" {...register('maxValue')} />
                </Form.Group>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Aplicar Filtros
                  </button>
                  <button
                    type="button"
                    onClick={handleCleanFilters}
                    className="btn btn-danger"
                  >
                    Limpar Filtros
                  </button>
                </div>
              </Form>
            </Col>
            {/* <Col md={3}>
              <FilterElement
                filterTitle="Categoria"
                filterList={filters.categories}
              />
            </Col>
            <Col md={2} className="filterByValue">
              <h6>Valor</h6>
              <div className="minMax-filter-container">
                <label>Min</label>
                <input
                  onChange={(e) =>
                    dispatch(
                      updateMaxMin({
                        filterName: 'minValue',
                        value: e.target.value,
                      })
                    )
                  }
                  value={filters.minValue[0].value!}
                />
                <label>Max</label>
                <input
                  onChange={(e) =>
                    dispatch(
                      updateMaxMin({
                        filterName: 'maxValue',
                        value: e.target.value,
                      })
                    )
                  }
                  value={filters.maxValue[0].value!}
                />
              </div>
            </Col>
            <Col>
              <div className="filters-action-btn">
                <button className="remove-filters-btn">Limpar Filtros</button>
                <button className="apply-filters-btn">Aplicar Filtros</button>
              </div>
            </Col> */}
          </Row>
        )}
      </Col>
    </Row>
  );
}
