# Copyright (c) 2022 ipyelk contributors.
# Distributed under the terms of the Modified BSD License.

try:
    from importlib.metadata import version
except:
    from importlib_metadata import version

NAME = "jupyterlite-lsp"

__version__ = version(NAME)

JS_NAMESPACE = "@jupyterlite"

EXTENSION_NAMES = [
    "lsp",
    "lsp-yaml",
]

__all__ = ["__version__", "JS_NAMESPACE", "EXTENSION_NAMES"]
