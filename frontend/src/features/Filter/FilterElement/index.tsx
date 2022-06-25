import './styles.scss';
import { IFiltersTransactions, IFiltersUpdate } from '../../../types/filter';
import { useAppDispatch } from '../../../app/hooks';
import { updateFilterState } from '../../Filter/filtersSlice';

interface Props {
  filterTitle: string;
  filterList: IFiltersTransactions[];
}

export default function FilterElement({ filterTitle, filterList }: Props) {
  const dispatch = useAppDispatch();
  const filterType = filterTitle === 'Categoria' ? 'categories' : 'weekday';
  const handleFiltersButton = function (filterName: string) {
    const payload: IFiltersUpdate = {
      filterType,
      filterName,
    };
    dispatch(updateFilterState(payload));
  };

  return (
    <>
      <h6 className="filter-title">{filterTitle}</h6>
      <div className="grid">
        {filterList.map((filter) => {
          return (
            <button
              key={filter.filterName}
              onClick={() => handleFiltersButton(filter.filterName)}
              className={filter.state ? 'selected' : ''}
            >
              <div className="filter-text">
                {filter.filterName}
                <span>+</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
