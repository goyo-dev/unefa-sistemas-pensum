import { useState, useMemo, useEffect, useRef } from "react";

interface Course {
  id: string;
  name: string;
  sem: number;
  reqs: string[];
  uc: number;
  isCritical?: boolean;
}

const pensumData: Course[] = [
  // Semestre 1
  { id: "ADG-25132", name: "Educación Ambiental", sem: 1, reqs: [], uc: 2 },
  {
    id: "ADG-25123",
    name: "Hombre, Sociedad, Ciencia y Tec.",
    sem: 1,
    reqs: [],
    uc: 2,
  },
  { id: "IDM-24113", name: "Inglés I", sem: 1, reqs: [], uc: 2 },
  { id: "MAT-21212", name: "Dibujo", sem: 1, reqs: [], uc: 2 },
  {
    id: "MAT-21215",
    name: "Matemática I",
    sem: 1,
    reqs: [],
    uc: 4,
    isCritical: true,
  },
  {
    id: "MAT-21524",
    name: "Geometría Analítica",
    sem: 1,
    reqs: [],
    uc: 4,
    isCritical: true,
  },
  { id: "ADG-25131", name: "Seminario I", sem: 1, reqs: [], uc: 2 },
  { id: "DIN-21113", name: "DIN I", sem: 1, reqs: [], uc: 2 },

  // Semestre 2
  { id: "IDM-24123", name: "Inglés II", sem: 2, reqs: ["IDM-24113"], uc: 2 },
  {
    id: "QUF-22014",
    name: "Química General",
    sem: 2,
    reqs: ["MAT-21215", "MAT-21524"],
    uc: 4,
  },
  {
    id: "QUF-23015",
    name: "Física I",
    sem: 2,
    reqs: ["MAT-21215", "MAT-21524"],
    uc: 4,
    isCritical: true,
  },
  {
    id: "MAT-21225",
    name: "Matemática II",
    sem: 2,
    reqs: ["MAT-21215", "MAT-21524"],
    uc: 5,
    isCritical: true,
  },
  {
    id: "MAT-21114",
    name: "Álgebra Lineal",
    sem: 2,
    reqs: ["MAT-21215", "MAT-21524"],
    uc: 4,
    isCritical: true,
  },
  { id: "ADG-25141", name: "Seminario II", sem: 2, reqs: ["ADG-25131"], uc: 2 },
  { id: "DIN-21123", name: "DIN II", sem: 2, reqs: ["DIN-21113"], uc: 2 },

  // Semestre 3
  {
    id: "QUF-23025",
    name: "Física II",
    sem: 3,
    reqs: ["QUF-23015", "MAT-21225"],
    uc: 4,
  },
  {
    id: "MAT-21235",
    name: "Matemática III",
    sem: 3,
    reqs: ["MAT-21225"],
    uc: 5,
    isCritical: true,
  },
  {
    id: "MAT-21414",
    name: "Probabilidades y Est.",
    sem: 3,
    reqs: ["MAT-21225"],
    uc: 4,
  },
  {
    id: "SYC-22113",
    name: "Programación",
    sem: 3,
    reqs: ["MAT-21114"],
    uc: 5,
    isCritical: true,
  },
  {
    id: "AGG-22313",
    name: "Sistemas Administrativos",
    sem: 3,
    reqs: [],
    uc: 4,
  },
  { id: "DIN-21133", name: "DIN III", sem: 3, reqs: ["DIN-21123"], uc: 2 },

  // Semestre 4
  { id: "SYC-32114", name: "Teoría de los Sistemas", sem: 4, reqs: [], uc: 3 },
  {
    id: "MAT-31714",
    name: "Cálculo Numérico",
    sem: 4,
    reqs: ["MAT-21235"],
    uc: 4,
  },
  {
    id: "MAT-31214",
    name: "Lógica Matemática",
    sem: 4,
    reqs: ["MAT-21114"],
    uc: 4,
    isCritical: true,
  },
  {
    id: "SYC-32225",
    name: "Lenguajes de Prog. I",
    sem: 4,
    reqs: ["SYC-22113"],
    uc: 4,
  },
  {
    id: "SYC-32414",
    name: "Procesamiento de Datos",
    sem: 4,
    reqs: ["SYC-22113"],
    uc: 4,
  },
  {
    id: "AGL-30214",
    name: "Sistemas de Producción",
    sem: 4,
    reqs: ["AGG-22313"],
    uc: 4,
  },
  { id: "DIN-31143", name: "DIN IV", sem: 4, reqs: ["DIN-21133"], uc: 2 },

  // Semestre 5
  {
    id: "MAT-31114",
    name: "Teoría de Grafos",
    sem: 5,
    reqs: ["MAT-31214", "MAT-21414"],
    uc: 4,
  },
  {
    id: "SYC-32235",
    name: "Lenguajes de Prog. II",
    sem: 5,
    reqs: ["SYC-32225"],
    uc: 4,
  },
  {
    id: "MAT-30925",
    name: "Investigación de Op.",
    sem: 5,
    reqs: ["MAT-31714"],
    uc: 4,
  },
  {
    id: "ELN-30514",
    name: "Circuitos Lógicos",
    sem: 5,
    reqs: ["MAT-31214"],
    uc: 4,
    isCritical: true,
  },
  {
    id: "SYC-32514",
    name: "Análisis de Sistemas",
    sem: 5,
    reqs: ["SYC-32114"],
    uc: 4,
  },
  {
    id: "SYC-32614",
    name: "Bases de Datos",
    sem: 5,
    reqs: ["SYC-32114"],
    uc: 3,
  },
  { id: "DIN-31153", name: "DIN V", sem: 5, reqs: ["DIN-31143"], uc: 2 },

  // Semestre 6
  {
    id: "MAT-30935",
    name: "Optimización No Lineal",
    sem: 6,
    reqs: ["MAT-30925"],
    uc: 4,
  },
  {
    id: "SYC-32245",
    name: "Lenguajes de Prog. III",
    sem: 6,
    reqs: ["SYC-32235"],
    uc: 4,
  },
  {
    id: "MAT-31414",
    name: "Procesos Estocásticos",
    sem: 6,
    reqs: ["MAT-30925", "MAT-31114"],
    uc: 4,
  },
  {
    id: "SYC-30525",
    name: "Arquitectura del Computador",
    sem: 6,
    reqs: ["ELN-30514"],
    uc: 4,
    isCritical: true,
  },
  {
    id: "SYC-32524",
    name: "Diseño de Sistemas",
    sem: 6,
    reqs: ["SYC-32514"],
    uc: 4,
  },
  {
    id: "SYC-30834",
    name: "Sistemas Operativos",
    sem: 6,
    reqs: ["SYC-30525"],
    uc: 3,
  },
  { id: "DIN-31163", name: "DIN VI", sem: 6, reqs: ["DIN-31153"], uc: 2 },

  // Semestre 7
  {
    id: "SYC-32714",
    name: "Implantación de Sistemas",
    sem: 7,
    reqs: ["SYC-32524"],
    uc: 4,
  },
  { id: "ADG-30214", name: "Metodología de la Inv.", sem: 7, reqs: [], uc: 3 },
  {
    id: "MAT-30945",
    name: "Simulación y Modelos",
    sem: 7,
    reqs: ["MAT-30935", "MAT-31414"],
    uc: 4,
  },
  { id: "SYC-31644", name: "Redes", sem: 7, reqs: ["SYC-30834"], uc: 4 },
  {
    id: "ADG-30224",
    name: "Gerencia de la Informática",
    sem: 7,
    reqs: [],
    uc: 3,
  },
  { id: "ELEC-TEC-7", name: "Electiva Técnica 7", sem: 7, reqs: [], uc: 3 },
  {
    id: "ELEC-NO-TEC-7",
    name: "Electiva No Técnica 7",
    sem: 7,
    reqs: [],
    uc: 2,
  },
  { id: "DIN-31173", name: "DIN VII", sem: 7, reqs: ["DIN-31163"], uc: 2 },

  // Semestre 8
  {
    id: "MAT-31314",
    name: "Teoría de Decisiones",
    sem: 8,
    reqs: ["MAT-30945"],
    uc: 4,
  },
  {
    id: "SYC-32814",
    name: "Auditoría de Sistemas",
    sem: 8,
    reqs: ["SYC-32714"],
    uc: 4,
  },
  {
    id: "CJU-37314",
    name: "Marco Legal Ejercicio Ing.",
    sem: 8,
    reqs: [],
    uc: 3,
  },
  { id: "TTC-31154", name: "Teleprocesos", sem: 8, reqs: ["SYC-31644"], uc: 4 },
  { id: "ELEC-TEC-8", name: "Electiva Técnica 8", sem: 8, reqs: [], uc: 3 },
  {
    id: "ELEC-NO-TEC-8",
    name: "Electiva No Técnica 8",
    sem: 8,
    reqs: [],
    uc: 5,
  },
  { id: "DIN-31183", name: "DIN VIII", sem: 8, reqs: ["DIN-31173"], uc: 2 },

  // Semestre 9
  {
    id: "PSI-30010",
    name: "Pasantía (Requiere 214 UC)",
    sem: 9,
    reqs: [],
    uc: 0,
  },
];

const TOTAL_UC_REQUIRED = 214;

const groupBySemester = (courses: Course[]): Record<number, Course[]> => {
  const semesters: Record<number, Course[]> = {};
  for (let i = 1; i <= 9; i++) {
    semesters[i] = [];
  }
  courses.forEach((c) => {
    semesters[c.sem].push(c);
  });
  return semesters;
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("unefa-dark-mode");
    return saved ? JSON.parse(saved) : true;
  });

  const [showInstructions, setShowInstructions] = useState(() => {
    const saved = localStorage.getItem("unefa-instructions-viewed");
    return saved ? JSON.parse(saved) : true;
  });

  const [passedCourses, setPassedCourses] = useState<Record<string, number>>(
    () => {
      const saved = localStorage.getItem("unefa-sistemas-grades");
      return saved ? JSON.parse(saved) : {};
    }
  );

  const [studyingCourses, setStudyingCourses] = useState<
    Record<string, number>
  >(() => {
    const saved = localStorage.getItem("unefa-sistemas-studying");
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedBlockedCourse, setSelectedBlockedCourse] = useState<
    string | null
  >(null);

  const [modalTab, setModalTab] = useState<"study" | "approve">("study");
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    courseId: string | null;
    gradeStr: string;
    pointsStr: string;
    noGrade: boolean;
  }>({
    isOpen: false,
    courseId: null,
    gradeStr: "",
    pointsStr: "",
    noGrade: false,
  });

  const [semestersData] = useState<Record<number, Course[]>>(() =>
    groupBySemester(pensumData)
  );

  const scrollContainerRef = useRef<HTMLElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const dragDistance = useRef(0);

  useEffect(() => {
    if (
      "serviceWorker" in navigator &&
      import.meta.env.PROD &&
      !window.location.hostname.includes("csb.app")
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("unefa-dark-mode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem(
      "unefa-instructions-viewed",
      JSON.stringify(showInstructions)
    );
  }, [showInstructions]);

  useEffect(() => {
    localStorage.setItem(
      "unefa-sistemas-grades",
      JSON.stringify(passedCourses)
    );
  }, [passedCourses]);

  useEffect(() => {
    localStorage.setItem(
      "unefa-sistemas-studying",
      JSON.stringify(studyingCourses)
    );
  }, [studyingCourses]);

  const getDependents = (courseId: string) => {
    const dependents = new Set<string>();
    const findDeps = (id: string) => {
      pensumData.forEach((course) => {
        if (course.reqs.includes(id) && !dependents.has(course.id)) {
          dependents.add(course.id);
          findDeps(course.id);
        }
      });
    };
    findDeps(courseId);
    return dependents;
  };

  const getPrerequisitesRecursive = useMemo(() => {
    return (courseId: string): Set<string> => {
      const prereqs = new Set<string>();
      const findReqs = (id: string) => {
        const course = pensumData.find((c) => c.id === id);
        if (course && course.reqs.length > 0) {
          course.reqs.forEach((reqId) => {
            if (!prereqs.has(reqId)) {
              prereqs.add(reqId);
              findReqs(reqId);
            }
          });
        }
      };
      findReqs(courseId);
      return prereqs;
    };
  }, []);

  const activePath = useMemo(() => {
    if (!selectedBlockedCourse) return null;
    const path = getPrerequisitesRecursive(selectedBlockedCourse);
    path.add(selectedBlockedCourse);
    return path;
  }, [selectedBlockedCourse, getPrerequisitesRecursive]);

  const currentUC = useMemo(() => {
    return Object.keys(passedCourses).reduce((acc, courseId) => {
      const course = pensumData.find((c) => c.id === courseId);
      return acc + (course ? course.uc : 0);
    }, 0);
  }, [passedCourses]);

  const unlockedCourses = useMemo(() => {
    const unlocked = new Set<string>();
    pensumData.forEach((course) => {
      if (!(course.id in passedCourses) && !(course.id in studyingCourses)) {
        if (course.id === "PSI-30010") {
          if (currentUC >= TOTAL_UC_REQUIRED) unlocked.add(course.id);
        } else {
          const canTake = course.reqs.every((req) => req in passedCourses);
          if (canTake) unlocked.add(course.id);
        }
      }
    });
    return unlocked;
  }, [passedCourses, studyingCourses, currentUC]);

  // --- NUEVA LÓGICA DE ARRASTRE MÁS FLUIDA ---
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragDistance.current = 0;
    if (scrollContainerRef.current) {
      startPos.current = {
        x: e.clientX,
        y: e.clientY,
        scrollLeft: scrollContainerRef.current.scrollLeft,
        scrollTop: scrollContainerRef.current.scrollTop,
      };
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    const walkX = (x - startPos.current.x) * 1.5;
    const walkY = (y - startPos.current.y) * 1.5;

    dragDistance.current =
      Math.abs(x - startPos.current.x) + Math.abs(y - startPos.current.y);

    scrollContainerRef.current.scrollLeft = startPos.current.scrollLeft - walkX;
    scrollContainerRef.current.scrollTop = startPos.current.scrollTop - walkY;
  };

  const handleCourseClick = (courseId: string) => {
    if (dragDistance.current > 5) return;

    const course = pensumData.find((c) => c.id === courseId);
    if (!course) return;

    const isPassed = courseId in passedCourses;
    const isStudying = courseId in studyingCourses;
    const isUnlocked = unlockedCourses.has(courseId);

    if (isPassed) {
      const deps = getDependents(courseId);
      let confirmMsg = `¿Deseas desmarcar ${course.name}?`;
      if (deps.size > 0) {
        confirmMsg = `⚠️ Si desmarcas ${course.name}, también se borrarán las notas de las materias que dependen de ella.\n¿Estás seguro?`;
      }
      if (window.confirm(confirmMsg)) {
        setPassedCourses((prev) => {
          const newPassed = { ...prev };
          delete newPassed[courseId];
          deps.forEach((dep) => delete newPassed[dep]);
          return newPassed;
        });
        setStudyingCourses((prev) => {
          const newStudying = { ...prev };
          delete newStudying[courseId];
          deps.forEach((dep) => delete newStudying[dep]);
          return newStudying;
        });
      }
      return;
    }

    if (isUnlocked || isStudying) {
      setSelectedBlockedCourse(null);
      if (course.id === "PSI-30010") {
        setPassedCourses((prev) => ({ ...prev, [courseId]: 0 }));
        return;
      }

      setModalTab(isStudying ? "study" : "approve");
      setModalData({
        isOpen: true,
        courseId,
        gradeStr: "",
        pointsStr: isStudying ? studyingCourses[courseId].toString() : "",
        noGrade: false,
      });
      return;
    }

    setSelectedBlockedCourse((prev) => (prev === courseId ? null : courseId));
  };

  const handleSaveModalData = () => {
    if (!modalData.courseId) return;

    if (modalTab === "study") {
      const pts = parseFloat(modalData.pointsStr || "0");
      if (!isNaN(pts) && pts >= 0 && pts <= 20) {
        setPassedCourses((prev) => {
          const next = { ...prev };
          delete next[modalData.courseId!];
          return next;
        });
        setStudyingCourses((prev) => ({ ...prev, [modalData.courseId!]: pts }));
        setModalData({
          isOpen: false,
          courseId: null,
          gradeStr: "",
          pointsStr: "",
          noGrade: false,
        });
      } else {
        window.alert(
          "Por favor, ingresa una nota válida de tus cortes entre 0 y 20."
        );
      }
    } else {
      if (modalData.noGrade) {
        setStudyingCourses((prev) => {
          const next = { ...prev };
          delete next[modalData.courseId!];
          return next;
        });
        setPassedCourses((prev) => ({ ...prev, [modalData.courseId!]: 0 }));
        setModalData({
          isOpen: false,
          courseId: null,
          gradeStr: "",
          pointsStr: "",
          noGrade: false,
        });
      } else {
        const grade = parseFloat(modalData.gradeStr);
        if (!isNaN(grade) && grade >= 10 && grade <= 20) {
          setStudyingCourses((prev) => {
            const next = { ...prev };
            delete next[modalData.courseId!];
            return next;
          });
          setPassedCourses((prev) => ({
            ...prev,
            [modalData.courseId!]: grade,
          }));
          setModalData({
            isOpen: false,
            courseId: null,
            gradeStr: "",
            pointsStr: "",
            noGrade: false,
          });
        } else {
          window.alert(
            "Por favor, ingresa una nota aprobatoria válida entre 10 y 20."
          );
        }
      }
    }
  };

  const gpa = useMemo(() => {
    let totalPoints = 0;
    let ucForGpa = 0;
    Object.entries(passedCourses).forEach(([id, grade]) => {
      const course = pensumData.find((c) => c.id === id);
      if (course && grade > 0) {
        totalPoints += grade * course.uc;
        ucForGpa += course.uc;
      }
    });
    return ucForGpa > 0 ? (totalPoints / ucForGpa).toFixed(2) : "0.00";
  }, [passedCourses]);

  const progressPercentage = Math.min(
    (currentUC / TOTAL_UC_REQUIRED) * 100,
    100
  ).toFixed(1);

  const resetProgress = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres reiniciar tu progreso, notas y materias en curso?"
      )
    ) {
      setPassedCourses({});
      setStudyingCourses({});
      setSelectedBlockedCourse(null);
      localStorage.removeItem("unefa-sistemas-grades");
      localStorage.removeItem("unefa-sistemas-studying");
    }
  };

  const activeModalCourse = pensumData.find((c) => c.id === modalData.courseId);

  return (
    <div
      className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-slate-950 text-slate-200"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* Header (Limpio, sin botones de respaldo) */}
      <header
        className={`${
          isDarkMode ? "bg-slate-900 border-b border-slate-800" : "bg-blue-900"
        } text-white shadow-md relative overflow-hidden shrink-0 transition-colors duration-300`}
      >
        <div className="max-w-[1600px] mx-auto p-3 sm:p-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between relative z-10">
          <div className="flex flex-col items-center sm:items-start select-none">
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight">
              Ingeniería de Sistemas{" "}
              <span
                className={`${
                  isDarkMode ? "text-slate-400" : "text-blue-300"
                } hidden sm:inline`}
              >
                | UNEFA
              </span>
            </h1>
            <p
              className={`${
                isDarkMode ? "text-slate-500" : "text-blue-200"
              } text-[10px] sm:text-xs font-medium`}
            >
              Gestión Académica e Índice Ponderado
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div
              className={`flex flex-col items-center justify-center min-w-[70px] py-1 px-3 rounded-lg border backdrop-blur-sm ${
                isDarkMode
                  ? "bg-slate-800/40 border-slate-700"
                  : "bg-blue-950/40 border-blue-800"
              }`}
            >
              <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider opacity-70">
                Índice
              </span>
              <span className="text-sm sm:text-lg font-bold text-emerald-400">
                {gpa}
              </span>
            </div>

            <div
              className={`flex flex-col flex-1 sm:flex-none py-1 px-3 rounded-lg border backdrop-blur-sm sm:w-44 ${
                isDarkMode
                  ? "bg-slate-800/40 border-slate-700"
                  : "bg-blue-950/40 border-blue-800"
              }`}
            >
              <div className="flex justify-between text-[8px] sm:text-[10px] uppercase font-bold tracking-wider mb-0.5">
                <span className="opacity-70">Meta: 214 UC</span>
                <span className="text-emerald-400">{currentUC} UC</span>
              </div>
              <div
                className={`w-full rounded-full h-1 sm:h-1.5 shadow-inner ${
                  isDarkMode ? "bg-slate-950" : "bg-blue-950"
                }`}
              >
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-1.5 ml-1">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-semibold transition-colors shadow-sm border ${
                  showInstructions
                    ? "bg-blue-600 border-blue-500 text-white"
                    : isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300"
                    : "bg-blue-800 hover:bg-blue-700 border-blue-700 text-slate-100"
                }`}
                title="Manual de Instrucciones"
              >
                📘
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-semibold transition-colors shadow-sm border ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-yellow-400"
                    : "bg-blue-800 hover:bg-blue-700 border-blue-700 text-slate-100"
                }`}
                title="Modo Oscuro / Claro"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={resetProgress}
                className="bg-red-500/90 hover:bg-red-500 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors shadow-sm text-white text-[10px]"
                title="Reiniciar Todo"
              >
                🔄
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Instructivo */}
      {showInstructions && (
        <div className="max-w-[1600px] mx-auto w-[calc(100%-2rem)] mt-4 p-4 rounded-xl border relative animate-fade-in text-xs sm:text-sm shadow-md bg-slate-100 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800/80">
          <button
            onClick={() => setShowInstructions(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1 transition-colors"
            title="Ocultar Manual"
          >
            ✕
          </button>
          <h3 className="font-bold text-sm sm:text-base mb-2 flex items-center gap-1.5 text-blue-900 dark:text-blue-400">
            📘 Guía de Uso del Sistema
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mt-2">
            <div className="p-2 rounded border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40">
              <span className="text-sm">🔒 Bloqueada</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Materias con prelaciones pendientes. **Tócala para iluminar su
                ruta de requisitos obligatorios (`🎯`)**.
              </p>
            </div>
            <div className="p-2 rounded border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40">
              <span className="text-sm text-blue-500 dark:text-blue-400">
                📌 Disponible
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                ¡Listo para gestionar! Haz clic para marcarla como **Cursando
                actualmente** o registrarla como **Aprobada**.
              </p>
            </div>
            <div className="p-2 rounded border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40">
              <span className="text-sm text-purple-500 dark:text-purple-400">
                📖 Cursando
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Asignaturas de tu semestre activo. Calcula de forma automática
                cuántos puntos te faltan para el 10 mínimo.
              </p>
            </div>
            <div className="p-2 rounded border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40">
              <span className="text-sm text-emerald-500 dark:text-emerald-400">
                ✅ Aprobada
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Materia superada. Suma créditos inmediatos y pondera su
                calificación matemática en tu Índice.
              </p>
            </div>
            <div className="p-2 rounded border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40">
              <span className="text-sm text-orange-500 dark:text-orange-400">
                🔥 Llave
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Asignaturas críticas de alta prioridad que abren múltiples
                ramificaciones importantes en el futuro.
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-center font-medium">
            🖱️ **Navegación libre en PC:** Mantén pulsado el clic izquierdo en
            un área vacía y arrastra hacia cualquier dirección (360°) para
            explorar todo el mapa.
          </p>
        </div>
      )}

      {/* Banner de Trazado Activo */}
      {selectedBlockedCourse && (
        <div className="bg-orange-500 text-white px-4 py-2 text-xs sm:text-sm font-semibold flex justify-between items-center animate-fade-in shadow-inner shrink-0 mt-3 mx-4 rounded-lg">
          <span>
            📍 Mostrando ruta para desbloquear:{" "}
            <strong className="underline">
              {pensumData.find((c) => c.id === selectedBlockedCourse)?.name}
            </strong>
          </span>
          <button
            onClick={() => setSelectedBlockedCourse(null)}
            className="bg-orange-700 hover:bg-orange-800 px-2 py-1 rounded text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-colors"
          >
            Limpiar
          </button>
        </div>
      )}

      {/* Grid de Semestres con espacio amplio para Drag libre */}
      <main
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex-1 overflow-auto p-4 sm:p-6 cursor-default active:cursor-grabbing [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-2.5 sm:[&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-600"
      >
        {/* pb-40 sm:pb-64 añade espacio físico extra abajo para que siempre puedas arrastrar hacia arriba */}
        <div className="flex flex-row gap-4 sm:gap-6 pb-40 sm:pb-64 min-w-max select-none h-max">
          {Object.keys(semestersData).map((semKeyStr) => {
            const semKey = parseInt(semKeyStr, 10);
            const courses = semestersData[semKey];
            const isFinished = courses.every((c) => c.id in passedCourses);

            return (
              <div
                key={semKey}
                className="w-64 sm:w-80 flex flex-col shrink-0 h-full"
              >
                <div
                  className={`p-2.5 sm:p-3 rounded-t-lg border-b-2 flex justify-between items-center shadow-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-900 text-slate-200"
                      : "bg-slate-200 border-slate-300 text-slate-700"
                  }`}
                >
                  <h2 className="font-bold text-sm sm:text-base pointer-events-none">
                    Semestre {semKey}
                  </h2>
                  {isFinished && (
                    <span className="text-emerald-500 text-lg font-bold pointer-events-none">
                      ✓
                    </span>
                  )}
                </div>

                <div
                  className={`p-2 sm:p-3 rounded-b-lg border border-t-0 flex-1 flex flex-col gap-2.5 sm:gap-3 shadow-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-slate-900/50 border-slate-800"
                      : "bg-slate-100 border-slate-200"
                  }`}
                >
                  {courses.map((course) => {
                    const isPassed = course.id in passedCourses;
                    const isStudying = course.id in studyingCourses;
                    const isUnlocked = unlockedCourses.has(course.id);

                    const grade = passedCourses[course.id] || 0;
                    const currentPoints = studyingCourses[course.id] || 0;

                    const isInActivePath = activePath
                      ? activePath.has(course.id)
                      : true;
                    const isTargetBlocked = selectedBlockedCourse === course.id;

                    let bgClass = isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-slate-200";
                    let textClass = isDarkMode
                      ? "text-slate-500"
                      : "text-slate-400";
                    let statusIcon = "🔒";
                    let borderClass = "border";
                    let pathingOpacity = activePath
                      ? isInActivePath
                        ? "opacity-100 scale-[1.01] z-10 shadow-md ring-2 ring-orange-400/30"
                        : "opacity-20 blur-[0.3px] grayscale"
                      : "";

                    if (isTargetBlocked) {
                      bgClass = isDarkMode
                        ? "bg-orange-950/40"
                        : "bg-orange-50";
                      borderClass = "border-2 border-orange-500 animate-pulse";
                      textClass = "text-orange-500 font-bold";
                      statusIcon = "🎯";
                    } else if (isPassed) {
                      bgClass = isDarkMode
                        ? "bg-emerald-900/10 hover:bg-emerald-900/30"
                        : "bg-emerald-50 hover:bg-emerald-100";
                      borderClass = isDarkMode
                        ? "border border-emerald-500/40"
                        : "border border-emerald-400";
                      textClass = isDarkMode
                        ? "text-emerald-300"
                        : "text-emerald-800";
                      statusIcon = "✅";
                    } else if (isStudying) {
                      bgClass = isDarkMode
                        ? "bg-purple-950/20 hover:bg-purple-950/40"
                        : "bg-purple-50/70 hover:bg-purple-100/70";
                      borderClass = isDarkMode
                        ? "border-2 border-purple-500/70 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                        : "border-2 border-purple-400";
                      textClass = isDarkMode
                        ? "text-purple-300 font-medium"
                        : "text-purple-900 font-medium";
                      statusIcon = "📖";
                    } else if (isUnlocked) {
                      bgClass = isDarkMode
                        ? "bg-blue-900/10 hover:bg-blue-900/30 shadow-sm"
                        : "bg-blue-50 shadow-sm hover:bg-blue-100";
                      borderClass = course.isCritical
                        ? isDarkMode
                          ? "border-2 border-orange-500/70"
                          : "border-2 border-orange-400"
                        : isDarkMode
                        ? "border-2 border-blue-500/40"
                        : "border-2 border-blue-400";
                      textClass = isDarkMode
                        ? "text-blue-300 font-medium"
                        : "text-blue-900 font-medium";
                      statusIcon = "📌";
                    } else if (course.isCritical) {
                      borderClass = isDarkMode
                        ? "border-dashed border-orange-500/20"
                        : "border-dashed border-orange-300/50";
                    }

                    return (
                      <div
                        key={course.id}
                        onClick={() => handleCourseClick(course.id)}
                        className={`p-2.5 sm:p-3 rounded transition-all duration-300 flex flex-col gap-1 relative overflow-hidden cursor-pointer ${bgClass} ${borderClass} ${pathingOpacity}`}
                      >
                        {course.isCritical && !isTargetBlocked && (
                          <div
                            className={`absolute top-0 right-0 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-bl-lg border-b border-l z-20 pointer-events-none ${
                              isDarkMode
                                ? "bg-orange-950/60 text-orange-400 border-orange-500/20"
                                : "bg-orange-100 text-orange-600 border-orange-200"
                            }`}
                          >
                            🔥 Llave
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 mt-0.5 pointer-events-none">
                          <span className="text-xs sm:text-sm drop-shadow-sm z-10">
                            {statusIcon}
                          </span>
                          <span
                            className={`text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              isDarkMode
                                ? "bg-slate-900/80 text-slate-400"
                                : "bg-slate-200/60 text-slate-600"
                            }`}
                          >
                            {course.id}
                          </span>
                        </div>

                        <span
                          className={`text-xs sm:text-sm leading-tight mt-1 pointer-events-none ${textClass}`}
                        >
                          {course.name}
                        </span>

                        <div className="mt-auto pt-2 sm:pt-3 flex justify-between items-center pointer-events-none">
                          {isPassed ? (
                            grade > 0 ? (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  isDarkMode
                                    ? "bg-emerald-900/40 text-emerald-300"
                                    : "bg-emerald-200/40 text-emerald-700"
                                }`}
                              >
                                Nota: {grade}
                              </span>
                            ) : (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  isDarkMode
                                    ? "bg-slate-800 text-slate-400"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                ✓ S/N
                              </span>
                            )
                          ) : isStudying ? (
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                isDarkMode
                                  ? "bg-purple-900/40 text-purple-300"
                                  : "bg-purple-200/50 text-purple-700"
                              }`}
                            >
                              {currentPoints > 0 && currentPoints < 10
                                ? `Faltan ${(10 - currentPoints).toFixed(
                                    1
                                  )} pts`
                                : currentPoints >= 10
                                ? "¡Ya aprobada! 🎉"
                                : "Faltan 10 pts"}
                            </span>
                          ) : (
                            <span></span>
                          )}
                          <span
                            className={`text-[10px] font-semibold ${
                              isPassed
                                ? isDarkMode
                                  ? "text-emerald-500"
                                  : "text-emerald-600"
                                : isStudying
                                ? isDarkMode
                                  ? "text-purple-400"
                                  : "text-purple-600"
                                : isDarkMode
                                ? "text-slate-600"
                                : "text-slate-400"
                            }`}
                          >
                            {course.uc} UC
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal Bottom Sheet con Teclado Numérico */}
      {modalData.isOpen && activeModalCourse && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() =>
              setModalData({
                isOpen: false,
                courseId: null,
                gradeStr: "",
                pointsStr: "",
                noGrade: false,
              })
            }
          ></div>

          <div
            className={`relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-xl p-5 sm:p-6 pb-10 sm:pb-6 shadow-2xl border-t sm:border transition-colors duration-300 transform scale-100 ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-slate-100"
                : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4 sm:hidden"></div>

            <h3 className="text-base sm:text-lg font-bold tracking-tight mb-0.5">
              Gestionar Asignatura
            </h3>
            <p
              className={`text-xs mb-4 font-medium ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>
                {activeModalCourse.name}
              </span>{" "}
              ({activeModalCourse.uc} UC)
            </p>

            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-4">
              <button
                type="button"
                onClick={() => setModalTab("study")}
                className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  modalTab === "study"
                    ? "border-purple-500 text-purple-500"
                    : "border-transparent text-slate-400 hover:text-slate-500"
                }`}
              >
                📖 Cursando
              </button>
              <button
                type="button"
                onClick={() => setModalTab("approve")}
                className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  modalTab === "approve"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-slate-400 hover:text-slate-500"
                }`}
              >
                ✅ Ya la aprobé
              </button>
            </div>

            {modalTab === "study" && (
              <div className="flex flex-col gap-3 animate-fade-in">
                <p
                  className={`text-[11px] leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Marca esta materia si la estás viendo este semestre. Puedes
                  indicar opcionalmente tus puntos acumulados actuales para
                  saber cuánto te falta.
                </p>
                <label className="text-xs uppercase tracking-wider font-bold opacity-75">
                  Nota Acumulada Actual (Opcional, 0 a 9.5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  inputMode="decimal"
                  placeholder="Ej: 4.5"
                  value={modalData.pointsStr}
                  onChange={(e) =>
                    setModalData((prev) => ({
                      ...prev,
                      pointsStr: e.target.value,
                    }))
                  }
                  className={`w-full p-2.5 rounded-lg border font-semibold text-center text-lg sm:text-sm outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    isDarkMode
                      ? "bg-slate-950 border-slate-800 focus:border-purple-500 text-white"
                      : "bg-slate-50 border-slate-200 focus:border-purple-600"
                  }`}
                />

                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        setModalData({
                          isOpen: false,
                          courseId: null,
                          gradeStr: "",
                          pointsStr: "",
                          noGrade: false,
                        })
                      }
                      className={`flex-1 py-3 sm:py-2 rounded-lg text-xs font-semibold border transition-colors ${
                        isDarkMode
                          ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300"
                          : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600"
                      }`}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveModalData}
                      className="flex-1 py-3 sm:py-2 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md transition-colors"
                    >
                      Guardar Cursando
                    </button>
                  </div>

                  {modalData.courseId &&
                    studyingCourses[modalData.courseId] !== undefined && (
                      <button
                        type="button"
                        onClick={() => {
                          setStudyingCourses((prev) => {
                            const next = { ...prev };
                            delete next[modalData.courseId!];
                            return next;
                          });
                          setModalData({
                            isOpen: false,
                            courseId: null,
                            gradeStr: "",
                            pointsStr: "",
                            noGrade: false,
                          });
                        }}
                        className="w-full py-2 sm:py-1.5 rounded-lg text-[11px] font-semibold text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors mt-1"
                      >
                        Quitar de "Cursando"
                      </button>
                    )}
                </div>
              </div>
            )}

            {modalTab === "approve" && (
              <div className="flex flex-col gap-3 animate-fade-in">
                <p
                  className={`text-[11px] leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Registra la materia como aprobada. Esto recalculará tus UC y
                  desbloqueará las asignaturas que dependen de ella.
                </p>

                <div className="flex items-center gap-2 py-1 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    id="noGradeCheck"
                    checked={modalData.noGrade}
                    onChange={(e) =>
                      setModalData((prev) => ({
                        ...prev,
                        noGrade: e.target.checked,
                      }))
                    }
                    className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0 cursor-pointer w-5 h-5 sm:w-4 sm:h-4"
                  />
                  <label
                    htmlFor="noGradeCheck"
                    className="text-xs sm:text-xs font-medium opacity-80 cursor-pointer"
                  >
                    Solo interactuar (Aprobar sin ingresar nota)
                  </label>
                </div>

                {!modalData.noGrade && (
                  <>
                    <label className="text-xs uppercase tracking-wider font-bold opacity-75">
                      Nota Final Obtenida (10 al 20)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="20"
                      inputMode="numeric"
                      placeholder="Ej: 16"
                      value={modalData.gradeStr}
                      onChange={(e) =>
                        setModalData((prev) => ({
                          ...prev,
                          gradeStr: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveModalData();
                      }}
                      className={`w-full p-3 sm:p-2.5 rounded-lg border font-semibold text-center text-xl sm:text-lg outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        isDarkMode
                          ? "bg-slate-950 border-slate-800 focus:border-blue-500 text-white"
                          : "bg-slate-50 border-slate-200 focus:border-blue-600"
                      }`}
                    />
                  </>
                )}

                <div className="flex gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setModalData({
                        isOpen: false,
                        courseId: null,
                        gradeStr: "",
                        pointsStr: "",
                        noGrade: false,
                      })
                    }
                    className={`flex-1 py-3 sm:py-2 rounded-lg text-xs font-semibold border transition-colors ${
                      isDarkMode
                        ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300"
                        : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600"
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveModalData}
                    className="flex-1 py-3 sm:py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
                  >
                    Guardar Nota
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Compacto */}
      <footer
        className={`border-t p-2 sm:p-4 sticky bottom-0 z-20 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] shrink-0 transition-colors duration-300 ${
          isDarkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex flex-col justify-center items-center gap-2 lg:flex-row lg:justify-between select-none">
          <div
            className={`flex flex-wrap justify-center gap-x-4 gap-y-1.5 w-full lg:w-auto text-[10px] sm:text-sm font-medium ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)] inline-block"></span>
              <span>Aprobadas: {Object.keys(passedCourses).length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-400 shadow-[0_0_5px_rgba(168,85,247,0.8)] inline-block"></span>
              <span>Cursando: {Object.keys(studyingCourses).length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(96,165,250,0.8)] inline-block"></span>
              <span>Disponibles: {unlockedCourses.size}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-orange-400 shadow-[0_0_5px_rgba(251,146,60,0.8)] inline-block"></span>
              <span>Materias Llave</span>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 text-[10px] sm:text-xs text-center px-3 py-1 rounded-full border w-full sm:max-w-md ${
              isDarkMode
                ? "bg-slate-800 text-slate-500 border-slate-700"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            <span>💡 Tip: Toca una materia para gestionarla.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
