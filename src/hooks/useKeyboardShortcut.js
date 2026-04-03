import { useEffect, useCallback } from 'react';

const useKeyboardShortcut = (key, callback, options = {}) => {
    const {
        ctrl = false,
        shift = false,
        alt = false,
        meta = false,
        preventDefault = true,
    } = options;

    const handleKeyDown = useCallback((event) => {
        const isCtrl = ctrl ? event.ctrlKey || event.metaKey : true;
        const isShift = shift ? event.shiftKey : true;
        const isAlt = alt ? event.altKey : true;
        const isMeta = meta ? event.metaKey : true;

        if (
            event.key.toLowerCase() === key.toLowerCase() &&
            isCtrl &&
            isShift &&
            isAlt &&
            isMeta
        ) {
            if (preventDefault) {
                event.preventDefault();
            }
            callback(event);
        }
    }, [key, callback, ctrl, shift, alt, meta, preventDefault]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
};

export default useKeyboardShortcut;