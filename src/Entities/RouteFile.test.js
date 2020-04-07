import RouteFile from './RouteFile';

test('create an instance of the class', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2"]);

    expect(rf.routePath).toEqual("path/route");
    expect(rf.files).toEqual(["path/file1", "path/file2"]);
});

test('add a path for a new file', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2"]);
    rf.addFilePath("path/file3");
    
    expect(rf.files).toEqual(["path/file1", "path/file2", "path/file3"]);
});

test('add a path for a file already saved', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2"]);

    rf.addFilePath("path/file2");
    expect(rf.files).toEqual(["path/file1", "path/file2"]);
});

test('removing an existing path', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2", "path/file3"]);
    rf.removeFilePath("path/file1");

    expect(rf.files).not.toContain("path/file1");
    expect(rf.files).toEqual(["path/file2", "path/file3"]);
});

test('removing non-existent path', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2", "path/file3"]);
    rf.removeFilePath("path/file4");

    expect(rf.files).toEqual(["path/file1", "path/file2", "path/file3"]);
});

test('the instance contains a file path', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2", "path/file3"]);
    
    expect(rf.hasPath("path/file1"));
});

test('the instance does not contain a file path', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2", "path/file3"]);
    
    expect(rf.hasPath("path/file4"));
});