<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# NoPragmaColumnExists [patch]
```csharp
public bool ColumnExists(string tableName, string columnName)
{
	return Query<int, string, string>("select count(name) from pragma_table_info(?) where name=?;", tableName, columnName) > 0;
}

```
