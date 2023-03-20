import { useCallback, useMemo, useState, useRef } from 'react';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { data } from './constants';
import { Wrapper, ContentWrapper, Button, Input, List } from './home.styles';

const Home = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedItemsIds, setSelectedItemsIds] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const selectRef = useRef(null);

  const closeEdition = useCallback(() => {
    setIsEditable(() => false);
  }, []);

  const handlerShowInput = useCallback(() => {
    setIsEditable((prev) => !prev);
  }, []);

  const handlerChangeInput = useCallback((e) => {
    setInputValue(() => e.target.value);
  }, []);

  const keyHandler = useCallback((event) => {
    if (event.key === 'Enter') {
      closeEdition();
    }
  }, []);

  const handlerChangeCheckbox = useCallback((id, e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedItemsIds((prev) => [...prev, id]);
    } else {
      setSelectedItemsIds((prev) => prev.filter((prevId) => prevId !== id));
    }
  }, []);

  const selectedItems = useMemo(
    () => data.filter((item) => selectedItemsIds.includes(item.id)),
    [selectedItemsIds],
  );

  const handlerChangeAnyCheckbox = useCallback((e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItemsIds(() => data.map((item) => item.id));
    } else {
      setSelectedItemsIds(() => []);
    }
  }, []);

  const buttonText = useMemo(
    () =>
      selectedItems.length
        ? selectedItems.map((item) => item.name).join(', ')
        : 'Please select',
    [selectedItems],
  );

  const filteredItems = useMemo(
    () =>
      data.filter(
        (item) =>
          item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1,
      ),
    [inputValue],
  );

  useOutsideClick(selectRef, () => {
    closeEdition();
  });

  return (
    <Wrapper>
      {!isEditable ? (
        <Button onClick={handlerShowInput} title={buttonText}>
          {buttonText}
        </Button>
      ) : (
        <ContentWrapper ref={selectRef}>
          <Input
            autoFocus
            value={inputValue}
            onChange={handlerChangeInput}
            onKeyPress={keyHandler}
          />
          <List>
            <li>
              <input
                type="checkbox"
                checked={data.length === selectedItemsIds.length}
                onChange={handlerChangeAnyCheckbox}
              />
              Any
            </li>
            {filteredItems.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={selectedItemsIds.includes(item.id)}
                  onChange={(e) => {
                    handlerChangeCheckbox(item.id, e);
                  }}
                />
                {item.name}
              </li>
            ))}
          </List>
        </ContentWrapper>
      )}
    </Wrapper>
  );
};

export default Home;
