from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class LoginRequest(_message.Message):
    __slots__ = ["name", "senha"]
    NAME_FIELD_NUMBER: _ClassVar[int]
    SENHA_FIELD_NUMBER: _ClassVar[int]
    name: str
    senha: str
    def __init__(self, name: _Optional[str] = ..., senha: _Optional[str] = ...) -> None: ...

class CreateUserRequest(_message.Message):
    __slots__ = ["name", "cargo", "senha"]
    NAME_FIELD_NUMBER: _ClassVar[int]
    CARGO_FIELD_NUMBER: _ClassVar[int]
    SENHA_FIELD_NUMBER: _ClassVar[int]
    name: str
    cargo: str
    senha: str
    def __init__(self, name: _Optional[str] = ..., cargo: _Optional[str] = ..., senha: _Optional[str] = ...) -> None: ...

class History(_message.Message):
    __slots__ = ["action", "date", "reason"]
    ACTION_FIELD_NUMBER: _ClassVar[int]
    DATE_FIELD_NUMBER: _ClassVar[int]
    REASON_FIELD_NUMBER: _ClassVar[int]
    action: str
    date: str
    reason: str
    def __init__(self, action: _Optional[str] = ..., date: _Optional[str] = ..., reason: _Optional[str] = ...) -> None: ...

class Product(_message.Message):
    __slots__ = ["id", "name", "description", "amount", "price", "minimalStorage", "history"]
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    PRICE_FIELD_NUMBER: _ClassVar[int]
    MINIMALSTORAGE_FIELD_NUMBER: _ClassVar[int]
    HISTORY_FIELD_NUMBER: _ClassVar[int]
    id: str
    name: str
    description: str
    amount: str
    price: str
    minimalStorage: int
    history: _containers.RepeatedCompositeFieldContainer[History]
    def __init__(self, id: _Optional[str] = ..., name: _Optional[str] = ..., description: _Optional[str] = ..., amount: _Optional[str] = ..., price: _Optional[str] = ..., minimalStorage: _Optional[int] = ..., history: _Optional[_Iterable[_Union[History, _Mapping]]] = ...) -> None: ...

class MessageResponse(_message.Message):
    __slots__ = ["response"]
    RESPONSE_FIELD_NUMBER: _ClassVar[int]
    response: str
    def __init__(self, response: _Optional[str] = ...) -> None: ...

class RemoveProductRequest(_message.Message):
    __slots__ = ["id", "quantity"]
    ID_FIELD_NUMBER: _ClassVar[int]
    QUANTITY_FIELD_NUMBER: _ClassVar[int]
    id: str
    quantity: int
    def __init__(self, id: _Optional[str] = ..., quantity: _Optional[int] = ...) -> None: ...
