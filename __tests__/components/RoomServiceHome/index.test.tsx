import React from "react";
import renderer from "react-test-renderer";
import { Testables } from "../../../components/RoomServiceHome";

jest.mock("@roomservice/react");

describe("<Testables.RoomServiceHome />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("has child", () => {
    const tree = renderer.create(<Testables.RoomServiceHome />).toJSON();
    expect(tree?.children.length).toBeGreaterThanOrEqual(1);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Testables.RoomServiceHome />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<Testables.Draggables />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const mockProp = {
    roomServiceData: "",
    map: "",
  };

  it("has child", () => {
    const tree = renderer.create(<Testables.Draggables {...mockProp} />).toJSON();
    expect(tree?.children.length).toBeGreaterThanOrEqual(1);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Testables.Draggables {...mockProp} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
