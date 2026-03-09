"use client";
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
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                    Nombre
                </label>
                <input
                    id="name" 
                    name="name" 
                    type="text" 
                    value={form.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.name &&errors.name)}
                    aria-describedby={touched.name &&errors.name?"name-error": undefined}
                    placeholder="Ingrese el nombre del autor" 
                    className="w-full rounded-lg border border-slate">
                </input>
                {touched.name && errors.name &&(
                    <p id="name-error" role="alert" className="text-sm text-red-400">
                        {errors.name}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="birthDate" className="block text-sm font-medium">
                    Fecha de nacimiento
                </label>
                <input
                    id="birthDate" 
                    name="birthDate" 
                    type="text" 
                    value={form.birthDate} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.birthDate &&errors.birthDate)}
                    aria-describedby={touched.birthDate &&errors.birthDate?"name-error": undefined}
                    placeholder="Ingrese la fecha de nacimiento del autor" 
                    className="w-full rounded-lg border border-slate">
                </input>
                {touched.birthDate && errors.birthDate &&(
                    <p id="name-error" role="alert" className="text-sm text-red-400">
                        {errors.birthDate}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">
                    Descripción
                </label>
                <input
                    id="description" 
                    name="description" 
                    type="text" 
                    value={form.description} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.description &&errors.description)}
                    aria-describedby={touched.description &&errors.description?"name-error": undefined}
                    placeholder="Ingrese la descripción del autor" 
                    className="w-full rounded-lg border border-slate">
                </input>
                {touched.description && errors.description &&(
                    <p id="name-error" role="alert" className="text-sm text-red-400">
                        {errors.description}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium">
                    Imagen
                </label>
                <input
                    id="image" 
                    name="image" 
                    type="text" 
                    value={form.image} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.image &&errors.image)}
                    aria-describedby={touched.image &&errors.image?"name-error": undefined}
                    placeholder="Ingrese la fecha de nacimiento del autor" 
                    className="w-full rounded-lg border border-slate">
                </input>
                {touched.image && errors.image &&(
                    <p id="name-error" role="alert" className="text-sm text-red-400">
                        {errors.image}
                    </p>
                )}
            </div>

            <button 
            type="submit"
            disabled={!isValid}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-6">
                Guardar
            </button>
            <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
                <h1 className="text-sm text-black mb-3">Vista previa</h1>

                <img
                    src={form.image || "https://via.placeholder.com/150"}
                    alt="preview autor"
                    className="w-32 h-32 object-cover rounded mb-3"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                />

                <p className="mb-1 text-slate-300">Nombre: {form.name || "···"}</p>
                <p className="mb-1 text-slate-300">Fecha: {form.birthDate || "···"}</p>
                <p className="mb-1 text-slate-300">Descripción: {form.description || "···"}</p>
            </div>
        </form>
    )
}