import * as tsd from "tsd";

import { NonEmptyTuple, RequireAllOrNone, RequireExactlyOne } from "type-fest";

// RequireAllOrNone

type NumberAndStringOrNothing = RequireAllOrNone<{ n: number; s: string }>;

tsd.expectAssignable<NumberAndStringOrNothing>({});
tsd.expectAssignable<NumberAndStringOrNothing>({ n: 0, s: "" });
tsd.expectNotAssignable<NumberAndStringOrNothing>({ n: 0 });
tsd.expectNotAssignable<NumberAndStringOrNothing>({ s: "" });

type HtmlAndCss = {
  html: string;
  css: string;
};

type AppWithOptionalEverything = RequireAllOrNone<HtmlAndCss> & {
  run?: (html: string, css: string) => void;
};

type AppWithOptionalRun = AppWithOptionalEverything & HtmlAndCss;

const css = "";
const html = "";
const run = (css: string, html: string): void => {
  // Bogus implementation because only the type is interesting.
  css + html;
};

tsd.expectAssignable<AppWithOptionalEverything>({});
tsd.expectAssignable<AppWithOptionalEverything>({ html, css });
tsd.expectAssignable<AppWithOptionalEverything>({ html, css, run });
tsd.expectNotAssignable<AppWithOptionalEverything>({ run });
tsd.expectNotAssignable<AppWithOptionalEverything>({ css, run });
tsd.expectNotAssignable<AppWithOptionalEverything>({ html, run });

tsd.expectAssignable<AppWithOptionalRun>({ html, css });
tsd.expectAssignable<AppWithOptionalRun>({ html, css, run });
tsd.expectNotAssignable<AppWithOptionalRun>({});
tsd.expectNotAssignable<AppWithOptionalRun>({ html });
tsd.expectNotAssignable<AppWithOptionalRun>({ css });
tsd.expectNotAssignable<AppWithOptionalRun>({ run });
tsd.expectNotAssignable<AppWithOptionalRun>({ html, run });
tsd.expectNotAssignable<AppWithOptionalRun>({ css, run });

// RequireExactlyOne

type NumberXorString = RequireExactlyOne<{ n: number, s: string }>;

tsd.expectAssignable<NumberXorString>({ n: 0 });
tsd.expectAssignable<NumberXorString>({ s: "" });
tsd.expectNotAssignable<NumberXorString>({});
tsd.expectNotAssignable<NumberXorString>({ n: 5, s: "" });

// ExcludeStrict

type BadType = { bad: string; evil: number };

tsd.expectAssignable<Exclude<any, BadType>>({});  // eslint-disable-line @typescript-eslint/no-explicit-any
tsd.expectAssignable<any & Exclude<any, BadType>>({ good: "hello" });  // eslint-disable-line @typescript-eslint/no-explicit-any
tsd.expectNotAssignable<Exclude<any, BadType>>({ bad: "fak u" });  // eslint-disable-line @typescript-eslint/no-explicit-any
tsd.expectNotAssignable<Exclude<any, BadType>>({ evil: 666 });  // eslint-disable-line @typescript-eslint/no-explicit-any
tsd.expectNotAssignable<Exclude<any, BadType>>({ bad: "fak u", evil: 666 });  // eslint-disable-line @typescript-eslint/no-explicit-any
tsd.expectNotAssignable<any & Exclude<any, BadType>>({ bad: "fak u", evil: 666 });  // eslint-disable-line @typescript-eslint/no-explicit-any

// NonEmptyTuple

tsd.expectAssignable<NonEmptyTuple<number>>([1]);
tsd.expectNotAssignable<NonEmptyTuple<number>>([]);
