
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";

interface DatabaseStatusProps {
  dbName: string;
  tables: { name: string; count: number }[];
}

export const DatabaseStatus: React.FC<DatabaseStatusProps> = ({ dbName, tables }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-xl">Database Status</CardTitle>
          <CardDescription>
            Using client-side IndexedDB for data persistence
          </CardDescription>
        </div>
        <Database className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-medium">Database:</h3>
            <Badge variant="outline" className="mt-1">
              {dbName}
            </Badge>
          </div>
          
          <div>
            <h3 className="font-medium">Tables:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
              {tables.map(table => (
                <div key={table.name} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm font-medium">{table.name}</span>
                  <Badge>{table.count}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
