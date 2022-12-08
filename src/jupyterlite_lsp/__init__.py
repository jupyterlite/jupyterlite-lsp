"""LSP for JupyterLite."""

from .constants import EXTENSION_NAMES, JS_NAMESPACE, __version__

__all__ = ["__version__", "_jupyter_labextension_paths"]


def _jupyter_labextension_paths():
    from .js import __prefix__

    return [
        dict(src=str(__prefix__ / ext), dest=f"{JS_NAMESPACE}/{ext}")
        for ext in EXTENSION_NAMES
    ]
