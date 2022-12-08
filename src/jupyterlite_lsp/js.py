# Copyright (c) 2022 ipyelk contributors.
# Distributed under the terms of the Modified BSD License.

import sys
from pathlib import Path

from .constants import JS_NAMESPACE

HERE = Path(__file__).parent

IN_TREE = (HERE / f"_d/share/jupyter/labextensions/{JS_NAMESPACE}").resolve()
IN_PREFIX = Path(sys.prefix) / f"share/jupyter/labextensions/{JS_NAMESPACE}"

__prefix__ = IN_TREE if IN_TREE.exists() else IN_PREFIX

__all__ = ["__prefix__"]
