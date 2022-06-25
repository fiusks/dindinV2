import './styles.scss';

import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import filterIcon from '../../assets/images/filter-icon.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectFilters, updateMaxMin } from './filtersSlice';
import FilterElement from '../Filter/FilterElement';

export default function Filter() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const [showFilter, setShowFilter] = useState(false);

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
              <FilterElement
                filterTitle="Dia da Semana"
                filterList={filters.weekday}
              />
            </Col>
            <Col md={3}>
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
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}
