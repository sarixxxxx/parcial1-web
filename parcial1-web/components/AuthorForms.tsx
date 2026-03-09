"use client";
/* eslint-disable @next/next/no-img-element */
import {useState} from "react";
import { useAuthors } from './AuthorsContext'
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import { useRouter } from "next/navigation";

type Errors = {
    birthDate?: string,
    name?: string, 
    description?: string, 
    image?: string 
}
type Form = {
    birthDate: string,
    name: string, 
    description: string, 
    image: string 
}
export default function AuthorForms(){
    const [form, setForm]= useState<Form>({birthDate: "",name: "", description: "", image:"" });
    const [errors, setErrors]= useState<Errors>({});
    const [touched, setTouched] = useState<{ name?: boolean; birthDate?: boolean; description?: boolean; image?: boolean}>({});
    const { authors, editAuthor, addAuthor} = useAuthors();
    const router = useRouter();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name,value}=e.target;
        setForm((prev)=> ({...prev, [name]:value}));
    }

    function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        addAuthor(
            authors.length+1,
            form.birthDate,
            form.name,
            form.description,
            form.image
        );

        alert(`Se ha guardado la información para el autor ${form.name}`)
        router.push("/authors");
    }

    function validateField(name: "name"|"birthDate"|"description"|"image", value:string):string |undefined{
        if(name==="name"){
            if(!value.trim()) return "El nombre es obligatorio";
            if(value.trim().length<8) return "Mínimo 8 caracteres por el nombre";
        }
        
        if (name==="birthDate"){
            const year = Number.parseInt(form.birthDate.substring(0,4));
            const month = Number.parseInt(form.birthDate.substring(5,7));
            const day = Number.parseInt(form.birthDate.substring(8,10));
            const validDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
            if (year < 1000 || year > 2026) return "El año ingresado no es válido";
            if (month <0 ||month >12) return "El mes ingresado no es válido ";
            if (day<1 || day >31) return "El día ingresado no es válido";
            if(!validDateFormat) return "El formato de fecha ingresado no es válido";
        }
        if(name==="description"){
            if(!value.trim()) return "La descripción es obligatoria";
            if(value.trim().length<8) return "Mínimo 8 caracteres para la descripción";
        }

        if(name==="image"){
            const isValidImage =
                value.startsWith("http://") ||
                value.startsWith("https://");
            if(!isValidImage) return "La dirección de la imagen debe contener 'http://' o 'https://'";
        }
        return undefined;
    }

    function handleBlur( e:React.FocusEvent<HTMLInputElement>){
        const {name, value}= e.target;
        setTouched((t)=> ({...t, [name]:true}));
        const msg= validateField(name as "name"|"birthDate"|"description"|"image", value);
        setErrors((prev)=>({...prev, [name]: msg}))
    }
    function validateAll(values:Form) : Errors {
        const e: Errors ={};
        const nameMsg= validateField("name", values.name);
        const birthDateMsg= validateField("birthDate", values.birthDate);
        const descriptionMsg= validateField("description", values.description);
        const imageMsg= validateField("image", values.image);
        if(nameMsg) e.name=nameMsg;
        if(birthDateMsg) e.birthDate=birthDateMsg;
        if(descriptionMsg) e.description=descriptionMsg;
        if(imageMsg) e.image=imageMsg;

        return e;
    }

    const isValid = Object.keys(validateAll(form)).length===0;

    return (
        <form onSubmit={handleSubmit} className="card max-w-3xl mx-auto p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3 w-full flex flex-col items-center text-center">
                <img
                    src={form.image || "https://via.placeholder.com/150"}
                    alt="preview autor"
                    className="w-32 h-32 object-cover rounded-full mb-4"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150"; }}
                />
                <h2 className="text-lg font-semibold">{form.name || "Nuevo autor"}</h2>
                <p className="text-sm text-slate-400">{form.birthDate || "YYYY-MM-DD"}</p>
                <p className="mt-2 text-sm text-slate-500">{form.description ? form.description.substring(0,80) : "Descripción breve..."}</p>
            </div>

            <div className="md:w-2/3 w-full">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nombre</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Ingrese el nombre del autor"
                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 bg-transparent"
                            aria-invalid={!!(touched.name && errors.name)}
                            aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                        />
                        {touched.name && errors.name && (
                            <p id="name-error" role="alert" className="text-sm text-red-500 mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-slate-700">Fecha de nacimiento</label>
                        <input
                            id="birthDate"
                            name="birthDate"
                            type="text"
                            value={form.birthDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="YYYY-MM-DD"
                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 bg-transparent"
                            aria-invalid={!!(touched.birthDate && errors.birthDate)}
                            aria-describedby={touched.birthDate && errors.birthDate ? "birthDate-error" : undefined}
                        />
                        {touched.birthDate && errors.birthDate && (
                            <p id="birthDate-error" role="alert" className="text-sm text-red-500 mt-1">{errors.birthDate}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descripción</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            value={form.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Ingrese la descripción del autor"
                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 bg-transparent"
                            aria-invalid={!!(touched.description && errors.description)}
                            aria-describedby={touched.description && errors.description ? "description-error" : undefined}
                        />
                        {touched.description && errors.description && (
                            <p id="description-error" role="alert" className="text-sm text-red-500 mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-slate-700">Imagen (URL)</label>
                        <input
                            id="image"
                            name="image"
                            type="text"
                            value={form.image}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 bg-transparent"
                            aria-invalid={!!(touched.image && errors.image)}
                            aria-describedby={touched.image && errors.image ? "image-error" : undefined}
                        />
                        {touched.image && errors.image && (
                            <p id="image-error" role="alert" className="text-sm text-red-500 mt-1">{errors.image}</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${isValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}