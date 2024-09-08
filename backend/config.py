from abc import ABC
from dataclasses import asdict, dataclass
import configparser


config = configparser.ConfigParser()
config.read("config.ini")


class CfgBase(ABC):
    dict: callable = asdict


class Mongo(CfgBase):
    host: str = config["MONGO"]["HOST"]

mongo = Mongo()
