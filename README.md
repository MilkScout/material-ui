## MilkScout - react - material-ui

This package contains common components for https://material-ui.com/.


<img src="https://assets.milkscout.eu/logo/logo.svg" width="300px" />

**MilkScout** want to give something back to the **community**.

usage `npm install @milkscout/material-ui` or `yarn add @milkscout/material-ui`

peer dependency => react, material-ui

<a href="https://milkscout.github.io/material-ui/" target="_blank">Demo</a>

###NumberField
An Field that composite an textfield https://material-ui.com/components/text-fields/#text-field.

The input type is forced to type="text", there will be a chrome like replacement for arrows.


Hints
   - no negative numbers supported, because smartphone numbers dont have an minus
   - does not contain validation 

Events are overridden:

    onChange: (value: number | undefined) => void;
    onFocus: (value: number | undefined) => void;
    onBlur: (value: number | undefined) => void;
    onKeyPress: (value: number | undefined) => void;
    onKeyUp: (value: number | undefined) => void;
    onKeyDown: (value: number | undefined) => void;

Additional attributes:
<table>
<tr>
    <td style="font-weight: bold">Attribute</td>
    <td style="font-weight: bold">Type</td>
    <td style="font-weight: bold">Required</td>
    <td style="font-weight: bold">Default</td>
    <td style="font-weight: bold">Description</td>
</tr>
<tr>
    <td>value</td>
    <td>number</td>
    <td>optional</td>
    <td>undefined</td>
    <td>The displayed number, maybe currency</td>
</tr>
<tr>
    <td>decimalPlaces</td>
    <td>number</td>
    <td>optional</td>
    <td>2</td>
    <td>The amount of decimal digits</td>
</tr>
<tr>
    <td>decimalCharacter</td>
    <td>string</td>
    <td>optional</td>
    <td>'.'</td>
    <td>The decimal divider</td>
</tr>
<tr>
    <td>thousandCharacter</td>
    <td>string</td>
    <td>optional</td>
    <td>','</td>
    <td>The thousand group character, can also be empty</td>
</tr>
<tr>
    <td>showArrow</td>
    <td>boolean</td>
    <td>optional</td>
    <td>false</td>
    <td>Show on desktop, always the arrows, not shown on mobile</td>
</tr>
<tr>
    <td>min</td>
    <td>number</td>
    <td>optional</td>
    <td>undefined</td>
    <td>Add the minimum for stepper, if minimum > 0, no negative numbers possible</td>
</tr>
<tr>
    <td>max</td>
    <td>number</td>
    <td>optional</td>
    <td>undefined</td>
    <td>Add the minimum for stepper</td>
</tr>
<tr>
    <td>step</td>
    <td>number</td>
    <td>optional</td>
    <td>1</td>
    <td>The step size if you click on the arrow or use the keyboard</td>
</tr>
</table>

