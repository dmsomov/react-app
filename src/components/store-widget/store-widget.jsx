import {
  useCallback,
  useMemo,
  useState,
  useRef,
  useContext,
  memo,
} from 'react';

import { StoreContext } from '../../context/store';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { data } from '../../constants';
import {
  Wrapper,
  ContentWrapper,
  Button,
  Input,
  List,
  Item,
} from './store-widget.styles';

export const StoreWidget = memo(() => {
  const {
    buttonText,
    isAllChecked,
    selectedItemsIds,
    handlerChangeCheckbox,
    handlerChangeAnyCheckbox,
  } = useContext(StoreContext);

  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const ref = useRef(null);

  const filteredItems = useMemo(
    () =>
      data.filter(({ name }) =>
        name.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    [inputValue],
  );

  const closeEdition = useCallback(() => {
    setIsEditable(() => false);
    setInputValue(() => '');
  }, []);

  const openEdition = useCallback(() => {
    setIsEditable(() => true);
  }, []);

  const handlerChangeInput = useCallback(({ target }) => {
    setInputValue(() => target.value);
  }, []);

  const keyHandler = useCallback(
    ({ key }) => {
      if (key === 'Enter') {
        closeEdition();
      }
    },
    [closeEdition],
  );

  useOutsideClick(ref, closeEdition);

  return (
    <Wrapper>
      {!isEditable ? (
        <Button onClick={openEdition} title={buttonText}>
          {buttonText}
        </Button>
      ) : (
        <ContentWrapper ref={ref}>
          <Input
            autoFocus
            value={inputValue}
            onChange={handlerChangeInput}
            onKeyPress={keyHandler}
          />
          <List>
            <Item>
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={handlerChangeAnyCheckbox}
              />
              Any
            </Item>
            {filteredItems.map(({ name, id }) => (
              <Item key={id}>
                <input
                  type="checkbox"
                  checked={selectedItemsIds.includes(id)}
                  onChange={(e) => {
                    handlerChangeCheckbox(id, e);
                  }}
                />
                {name}
              </Item>
            ))}
          </List>
        </ContentWrapper>
      )}
    </Wrapper>
  );
});
