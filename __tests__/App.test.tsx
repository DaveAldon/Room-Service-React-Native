import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

describe("<App />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("has safearea child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree?.type).toEqual("RCTSafeAreaView");
  });

  it("renders correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
