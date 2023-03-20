import { useState, useCallback, useMemo } from 'react';

import { data } from '../constants';

export const useStore = () => {
  const [selectedItemsIds, setSelectedItemsIds] = useState([]);

  const selectedItems = useMemo(
    () => data.filter(({ id }) => selectedItemsIds.includes(id)),
    [selectedItemsIds],
  );

  const buttonText = useMemo(
    () =>
      selectedItems.length > 0
        ? selectedItems.map(({ name }) => name).join(', ')
        : 'Please select',
    [selectedItems],
  );

  const isAllChecked = useMemo(
    () => data.length === selectedItemsIds.length,
    [selectedItemsIds],
  );

  const handlerChangeAnyCheckbox = useCallback(({ target }) => {
    setSelectedItemsIds(() => (target.checked ? data.map(({ id }) => id) : []));
  }, []);

  const handlerChangeCheckbox = useCallback((id, { target }) => {
    setSelectedItemsIds((prev) =>
      target.checked ? [...prev, id] : prev.filter((prevId) => prevId !== id),
    );
  }, []);

  return {
    buttonText,
    isAllChecked,
    selectedItemsIds,
    handlerChangeCheckbox,
    handlerChangeAnyCheckbox,
  };
};
