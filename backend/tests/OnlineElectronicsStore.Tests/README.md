# Tests — OnlineElectronicsStore

Run all tests:
```
dotnet test
```

Or run this test project specifically:
```
dotnet test ./backend/tests/OnlineElectronicsStore.Tests/OnlineElectronicsStore.Tests.csproj
```

Notes:
- Ensure backend project builds and referenced namespaces match. Adjust namespace imports in test files to match your actual project namespaces.
- Tests use Moq and FluentAssertions.