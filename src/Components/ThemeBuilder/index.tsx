import { useOnClickOutside } from "Hooks/useClickOutside";
import classNames from "classnames";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

import Button from "Components/Button";
import Icon from "Components/Icon";

import { IColors, IThemeBuilder } from "./types";

const ThemeBuilder: FC<IThemeBuilder> = ({
  onColorsChange,
  onReset,
  isResetButtonShown,
  buttons,
  settings = { background: "", primary: "", text: "" }
}) => {
  const initialSelected = {
    type: "",
    color: "",
    cssVariable: ""
  };

  const [selected, setSelected] = useState<{
    type: string;
    color: string;
    cssVariable: string;
  }>(initialSelected);

  const [colors, setColors] = useState<IColors>({
    primary: "",
    background: "",
    text: ""
  });

  const ref = useRef<HTMLDivElement>(null);
  const isDirty = useMemo(
    () =>
      Object.keys(colors).some(
        key => colors[key as keyof IColors] !== settings[key as keyof IColors]
      ),
    [colors, settings]
  );

  useOnClickOutside(ref, () => {
    setSelected(initialSelected);
  });

  const handleSaveColors = () => {
    onColorsChange(colors);
    setColors(colors);
    setSelected(initialSelected);
  };

  const setCSSVariable = (variable: string, value: string) =>
    document.documentElement.style.setProperty(variable, value);

  const handleReset = () => {
    setCSSVariable("--color-primary", "#4f46e5");
    setCSSVariable("--text-color", "#6b7280");
    setCSSVariable("--color-bg", "#1b1f23");
    setSelected(initialSelected);
    setColors(settings);
    onReset();
  };

  useEffect(() => {
    setCSSVariable("--color-primary", settings.primary);
    setCSSVariable("--text-color", settings.text);
    setCSSVariable("--color-bg", settings.background);
    setColors(settings);
  }, [settings.primary, settings.background, settings.text]);

  useEffect(() => {
    if (!selected.type) {
      return;
    }

    setCSSVariable(selected.cssVariable, selected.color);
    setColors({
      ...colors,
      [selected.type]: selected.color
    });
  }, [selected.type, selected.color]);

  return (
    <div ref={ref}>
      <div className='mb-1 flex items-center'>
        <div
          className={classNames(
            "relative border-2 border-r-0 border-primary bg-primary px-3 py-2"
          )}
        >
          <Icon iconName='IconColors' className='w-5' />
        </div>
        {buttons.map((button, idx) => {
          return (
            <Button
              key={button.type}
              outlined={button.type !== selected.type}
              className={classNames(button.className, "shadow-none", {
                "border-l-0 border-r-0": idx === 1
              })}
              onClick={() => {
                setSelected({
                  type: button.type,
                  cssVariable: button.cssVariable,
                  color: colors[button.type as keyof typeof colors]
                });
              }}
            >
              {button.label}
            </Button>
          );
        })}
        {isDirty && (
          <div className='ml-2 flex gap-1'>
            <Button className='group' onClick={handleSaveColors}>
              Save
            </Button>

            {isResetButtonShown && (
              <Button outlined onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>
        )}
      </div>

      {selected.type && (
        <div className='relative flex items-center justify-start'>
          <div className='relative mt-2'>
            <div onClick={() => setSelected(initialSelected)}>
              <Icon
                iconName='IconClose'
                className='absolute right-[-5px] top-[-5px] z-50 w-4 cursor-pointer rounded-lg border-2 border-primary bg-primary-background-color text-primary hover:bg-primary hover:text-primary-background-color'
              />
            </div>

            <HexColorInput
              role='presentation'
              onChange={(color: string) => setSelected({ ...selected, color })}
              color={selected?.color || ""}
              placeholder='e.g.175ca1'
              className='bg mb-2 rounded-lg border-2 border-primary bg-transparent p-2 text-primary-text-color shadow-md hover:border-primary focus:border-primary focus:shadow-none focus:outline-none focus:ring-transparent dark:text-primary-text-color'
            />
            <HexColorPicker
              onChange={color => setSelected({ ...selected, color })}
              color={selected?.color}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeBuilder;