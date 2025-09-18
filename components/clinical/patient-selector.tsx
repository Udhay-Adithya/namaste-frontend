"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Plus, Search } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  mrn: string
  lastVisit?: string
}

interface PatientSelectorProps {
  onPatientSelect?: (patient: Patient) => void
  selectedPatient?: Patient | null
}

// Mock patient data
const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    mrn: "MRN001",
    lastVisit: "2024-01-15",
  },
  {
    id: "P002",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    mrn: "MRN002",
    lastVisit: "2024-01-10",
  },
  {
    id: "P003",
    name: "Arjun Patel",
    age: 28,
    gender: "Male",
    mrn: "MRN003",
    lastVisit: "2024-01-08",
  },
]

export function PatientSelector({ onPatientSelect, selectedPatient }: PatientSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewPatient, setShowNewPatient] = useState(false)
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    mrn: "",
  })

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePatientSelect = (patient: Patient) => {
    onPatientSelect?.(patient)
  }

  const handleNewPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.gender && newPatient.mrn) {
      const patient: Patient = {
        id: `P${Date.now()}`,
        name: newPatient.name,
        age: Number.parseInt(newPatient.age),
        gender: newPatient.gender,
        mrn: newPatient.mrn,
      }
      onPatientSelect?.(patient)
      setNewPatient({ name: "", age: "", gender: "", mrn: "" })
      setShowNewPatient(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Patient Selection</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowNewPatient(!showNewPatient)}>
            <Plus className="h-4 w-4 mr-2" />
            New Patient
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedPatient ? (
          <div className="p-4 border rounded-lg bg-primary/5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{selectedPatient.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => onPatientSelect?.(null)}>
                Change
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>
                <span>MRN:</span> {selectedPatient.mrn}
              </div>
              <div>
                <span>Age:</span> {selectedPatient.age}
              </div>
              <div>
                <span>Gender:</span> {selectedPatient.gender}
              </div>
              {selectedPatient.lastVisit && (
                <div>
                  <span>Last Visit:</span> {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {showNewPatient ? (
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium">Create New Patient</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      placeholder="Patient name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mrn">MRN</Label>
                    <Input
                      id="mrn"
                      value={newPatient.mrn}
                      onChange={(e) => setNewPatient({ ...newPatient, mrn: e.target.value })}
                      placeholder="Medical record number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={newPatient.gender}
                      onValueChange={(value) => setNewPatient({ ...newPatient, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleNewPatient} size="sm">
                    Create Patient
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewPatient(false)} size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients by name or MRN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handlePatientSelect(patient)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{patient.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {patient.gender}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>MRN: {patient.mrn}</span> • <span>Age: {patient.age}</span>
                        {patient.lastVisit && (
                          <span> • Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredPatients.length === 0 && (
                    <div className="text-center text-muted-foreground py-4">
                      <p>No patients found</p>
                      <p className="text-sm">Try adjusting your search or create a new patient</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
