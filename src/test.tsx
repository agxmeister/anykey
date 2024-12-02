import * as React from "react";

type TestProps = {
    attr: string,
}
export default function Test({attr}: TestProps)
{
    return (
        <div>It is a test {attr}!</div>
    );
}
